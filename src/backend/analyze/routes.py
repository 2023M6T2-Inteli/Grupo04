from sanic.response import HTTPResponse,json
from middleware.body_check import validate_body
from analyze.utils import Schema
from analyze.controller import register, get_all, get_analyze, update_analyze, delete_analyze
from sanic import Blueprint, Websocket, Request
from ultralytics import YOLO
import numpy as np
import cv2 as cv
import asyncio
  
analyze = Blueprint('analyze', __name__)

model = YOLO('analyze/best.pt')
clients = []
frame_queue = asyncio.Queue()

@analyze.post("/create")
@validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
    data = request.json
    response, code = register(routeId=data['routeId'], name=data['name'], startDate=data['startDate'], endDate=data['endDate'], supervisor=data['supervisor'], operator=data['operator'])
    return json(response, code)

@analyze.get("/get_analyzes")
async def handler_get_all(request: Request) -> HTTPResponse:
    response, code = get_all()
    return json(response, code)

@analyze.get("/get_analyze/<id:int>")
@validate_body(Schema.GET.value)
async def handler_get_analyze(request: Request, id: int) -> HTTPResponse:
    response, code = get_analyze(id)
    return json(response, code)

@analyze.put("/update_analyze/<id:int>")
@validate_body(Schema.UPDATE.value)
async def handler_update_analyze(request: Request, id: int) -> HTTPResponse:
    data = request.json
    response, code = update_analyze(id, routeId=data['routeId'], name=data['name'], startDate=data['startDate'], endDate=data['endDate'], supervisor=data['supervisor'], operator=data['operator'])
    return json(response, code)

@analyze.delete("/delete_analyze/<id:int>")
@validate_body(Schema.DELETE.value)
async def handler_delete_analyze(request: Request, id: int) -> HTTPResponse:
    response, code = delete_analyze(id)
    return json(response, code)

@analyze.post("/video_upload")
async def video_upload(request: Request) -> json:
    print(len(request.files.get('image')))
    print(type(request.files.get('image')))
    image_bytes = request.files.get('image')[1]
    nparr = np.fromstring(image_bytes, np.uint8)
    img = cv.imdecode(nparr, cv.IMREAD_COLOR)
    result = model.predict(img, conf=0.4)

    await frame_queue.put(result[0].plot())

    return json({"status": "success"})

@analyze.websocket("/video_feed")
async def video_feed(request: Request, ws: Websocket):
    clients.append(ws)
    try:
        while True:
            frame = await frame_queue.get()
            if frame is not None:
                _, buffer = cv.imencode('.jpg', frame)
                frame_bytes = buffer.tobytes()

                tasks = []
                for client in clients:
                    tasks.append(asyncio.create_task(client.send(frame_bytes)))
    
                await asyncio.gather(*tasks)
    except Exception as err:
        print(err)
    finally:
        clients.remove(ws)
