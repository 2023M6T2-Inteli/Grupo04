import asyncio
from asyncio import Queue

import cv2 as cv
from sanic import Blueprint, Websocket, Request
from sanic.response import HTTPResponse, json
from sanic_ext import openapi
from ultralytics import YOLO

from analyze.controller import register, get_all, get_analyze, update_analyze, delete_analyze, receive_image, \
    create_sensor_data
from analyze.service import AnalyzeTestCreate, AnalyzeTestUpdate, AnalyzeTestStart

from robot.controller import update_robot

analyze = Blueprint('analyze', __name__)

model = YOLO('analyze/best.pt')
clients: dict[str, list[Websocket]] = {}
frame_queue: dict[str, Queue] = {}
VALORES_RECEBIDOS = []
WAITING_ANALYZE = {}
ANALYZING = {}


@analyze.post("/create")
@openapi.summary("Create a new analyze")
@openapi.description("This endpoint allows you to create a new analyze.")
@openapi.definition(body={'application/json': AnalyzeTestCreate.schema()}, )
# @validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
    data = request.json
    response, code = register(routeId=data['routeId'], name=data['name'], status='In progress',
                              startDate=data['startDate'],
                              endDate=data['endDate'], supervisor=data['supervisor'], operator=data['operator'],
                              robotId=int(data['robotId']))
    return json(response, code)


@analyze.get("/get_analyzes")
@openapi.summary("Get all analyzes")
@openapi.description("This endpoint allows you to get all analyzes. And you don't need to send any data.")
async def handler_get_all(request: Request) -> HTTPResponse:
    response, code = get_all()
    return json(response, code)


@analyze.get("/get_analyze/<id:int>")
@openapi.summary("Get a analyze")
@openapi.description("This endpoint allows you to get a analyze.")
async def handler_get_analyze(request: Request, id: int) -> HTTPResponse:
    response, code = get_analyze(id=id)
    return json(response, code)


@analyze.put("/update_analyze")
@openapi.summary("Update a analyze")
@openapi.description("This endpoint allows you to update a analyze. And you need to send all data.")
@openapi.definition(body={'application/json': AnalyzeTestUpdate.schema()}, )
# @validate_body(Schema.UPDATE.value)
async def handler_update_analyze(request: Request) -> HTTPResponse:
    data = request.json
    response, code = update_analyze(id=data['id'], routeId=data['routeId'], name=data['name'], status=data['status'],
                                    startDate=data['startDate'], endDate=data['endDate'], supervisor=data['supervisor'],
                                    operator=data['operator'])
    return json(response, code)


@analyze.delete("/delete_analyze/<id:int>")
@openapi.summary("Delete a analyze")
@openapi.description("This endpoint allows you to delete a analyze.")
# @validate_body(Schema.DELETE.value)
async def handler_delete_analyze(request: Request, id: int) -> HTTPResponse:
    response, code = delete_analyze(id)
    return json(response, code)


@analyze.post("/video_upload/<id:int>")
@openapi.summary("Upload a video from camera")
@openapi.description("This endpoint allows you to upload a video from camera.")
async def video_upload(request: Request, id: int) -> json:
    try:
        image_bytes: bytes = request.files.get('image')[1]
        response, code = await receive_image(image_bytes, id, frame_queue)
        return json(response, code)
    except Exception as err:
        return json({'message': 'Error, image not sent due to this error: {err}'}, 500)


@analyze.get("/end-livestream/<id:int>")
@openapi.summary("End the livestream of the video")
@openapi.description("This endpoint allows to end the livestream of the video.")
async def end_livestream(request: Request, id: int) -> json:
    try:
        del frame_queue[str(id)]
        return json({'message': 'Livestream ended'}, 200)
    except Exception as err:
        return json({'message': 'Error, image not sent due to this error: {err}'}, 500)


@analyze.put("/start_analyze/<id:int>")
@openapi.summary("Initiate analyze")
@openapi.description("This endpoint allows you inform that the analyze has to be started.")
@openapi.definition(body={'application/json': AnalyzeTestStart.schema()}, )
async def start_analyze_server(request: Request, id: int) -> json:
    data = request.json
    WAITING_ANALYZE[str(data['ip'])] = id
    return json({'message': 'Analyze started'}, 200)


@analyze.websocket("/video_feed/<id:int>")
@openapi.summary("Get image from camera")
@openapi.description("This endpoint allows you to get image from camera.")
async def video_feed(request: Request, ws: Websocket, id: int):
    if not str(id) in clients:
        clients[str(id)] = []
    clients[str(id)].append(ws)
    try:
        while True:
            if str(id) in frame_queue:
                try:
                    frame = await frame_queue[str(id)].get()
                except Exception as err:
                    print(f'ERRO AO PEGAR FRAME DA FILA! {err}')
                    frame = None
                if frame is not None:
                    _, buffer = cv.imencode('.jpg', frame)
                    frame_bytes = buffer.tobytes()

                    tasks = []
                    for client in clients[str(id)]:
                        tasks.append(asyncio.create_task(client.send(frame_bytes)))

                    await asyncio.gather(*tasks)
                else:
                    print(f'SEM VIDEO DISPONIVEL!')
                    tasks = []
                    for client in clients[str(id)]:
                        tasks.append(asyncio.create_task(client.send("VIDEO ENDED!")))

                    await asyncio.gather(*tasks)
                    await asyncio.sleep(1)
            else:
                # tasks = []
                # for client in clients[str(id)]:
                #     tasks.append(asyncio.create_task(client.send("VIDEO ENDED!")))
                #
                # await asyncio.gather(*tasks)
                await asyncio.sleep(1)
    except Exception as err:
        print(f'DEU ERRO! {err}')
    finally:
        clients[str(id)].remove(ws)


@analyze.websocket("/gas-sensor/<id:int>")
async def gas_sensor(request: Request, ws: Websocket, id: int):
    async for msg in ws:
        try:
            data = await ws.recv()
            if isinstance(data, str) and data.isdigit() and int(data) > 0:
                VALORES_RECEBIDOS.insert(0, int(data))
                print(f'CHEGOU O VALOR! ---> {data}')
                response, code = create_sensor_data(id, int(data))
            if response:
                await ws.send(f"{response['message']} with code {code}")
            else:
                await ws.send(f"Data is not valid!")
        except Exception as err:
            print(f"ERROOORR!! {err}")


@analyze.websocket("/gas-sensor-frontend")
async def gas_sensor_reading(request: Request, ws: Websocket):
    async for msg in ws:
        try:
            if VALORES_RECEBIDOS:
                await ws.send(str(VALORES_RECEBIDOS.pop()))
            else:
                await asyncio.sleep(0.5)
        except Exception as err:
            print(f"ERROOORR!! {err}")
            await asyncio.sleep(1)


@analyze.websocket("/start-analyze/<ip:str>")
async def start_analyze(request: Request, ws: Websocket, ip: str):
    analyze_id: int | None = None
    try:
        # TODO!
        # Mudar o status do robo como disponível
        update_robot(ip=ip, data={"active": True})
        while True:
            if ip in WAITING_ANALYZE:
                # TODO!
                # Get id da análise
                analyze_id = WAITING_ANALYZE[ip]
                await ws.send(str(analyze_id))
                ANALYZING[ip] = "Analyzing..."
            else:
                print("Waiting for analyze...")
                await asyncio.sleep(0.5)
            if ip in ANALYZING:
                while True:
                    try:
                        data = await ws.recv()
                        if isinstance(data, str) and data.isdigit() and int(data) > 0:
                            VALORES_RECEBIDOS.insert(0, int(data))
                            print(f'CHEGOU O VALOR! ---> {data}')
                            response, code = create_sensor_data(analyze_id, int(data))
                        if response:
                            await ws.send(f"{response['message']} with code {code}")
                        else:
                            raise Exception("Stopped sending data...")
                    except Exception as err:
                        print(f"ERROOORR!! {err}")
                        del ANALYZING[ip]
                        del WAITING_ANALYZE[ip]
                        break
    except Exception as err:
        print(f"ERROR!! {err}")
        await asyncio.sleep(1)
    finally:
        # TODO!
        # Mudar o status do robo como indisponível
        update_robot(ip=ip, data={"active": False})
        try:
            del ANALYZING[ip]
            del WAITING_ANALYZE[ip]
        except:
            print("Already ip's deleted!")
        print("FIM DO WHILE")
