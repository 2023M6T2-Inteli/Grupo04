from sanic import Blueprint, Websocket, Request
from sanic.response import json
from textwrap import dedent
from ultralytics import YOLO
import numpy as np
import cv2 as cv
import asyncio

analyze = Blueprint('analyze', __name__)

model = YOLO('analyze/best.pt')
clients = []
frame_queue = asyncio.Queue()

@analyze.get("/create")
async def create(request):
    return json({"Hello": "World"})

@analyze.post("/video_upload")
async def video_upload(request: Request) -> json:
    # print(request.files)
    # print(request.body)
    print(len(request.files.get('image')))
    print(type(request.files.get('image')))
    image_bytes = request.files.get('image')[1]
    nparr = np.fromstring(image_bytes, np.uint8)
    img = cv.imdecode(nparr, cv.IMREAD_COLOR)
    result = model.predict(img, conf=0.6)

    await frame_queue.put(result[0].plot())

    return json({"status": "success"})

@analyze.websocket("/video_feed")
async def video_feed(request: Request, ws: Websocket):
    clients.append(ws)
    try:
        while True:
            frame = await frame_queue.get()
            if frame is not None:
                _, buffer = cv.imencode('.jpg', cv.flip(frame, 1))
                frame_bytes = buffer.tobytes()

                tasks = []
                for client in clients:
                    tasks.append(asyncio.create_task(client.send(frame_bytes)))
    
                await asyncio.gather(*tasks)
    except Exception as err:
        print(err)
    finally:
        clients.remove(ws)
