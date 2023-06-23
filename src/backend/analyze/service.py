from analyze.model import get_analyze, get_analyzes, create_analyze, update_analyze, delete_analyze, save_image, \
    create_sensor_data
from datetime import datetime, date
from pydantic import BaseModel, Field
import cv2 as cv
import numpy as np
import asyncio
from ultralytics import YOLO
import boto3
import os

from pydantic import BaseModel, Field

MODEL = YOLO('analyze/best.pt')

# Class Analyze
class Analyze:
    # Constructor
    def __init__(self, id: int = "", routeId: int = "", name: str = "", status: str = "", startDate: str = "",
                 endDate: str = "", supervisor: str = "", operator: str = "", createdAt: date = "",
                 robotId: int = None) -> None:
        self.id = id
        self.routeId = routeId
        self.name = name.upper()
        self.status = status
        self.startDate = startDate
        self.endDate = endDate
        self.supervisor = supervisor.upper()
        self.operator = operator.upper()
        self.robotId = robotId
        self.createdAt = createdAt

    # This function registers an analysis with the provided details and returns an analyze.
    def register(self) -> dict[str, str]:
        try:
            analyze = create_analyze(
                routeId=self.routeId,
                name=self.name,
                startDate=self.startDate,
                endDate=self.endDate,
                supervisor=self.supervisor,
                operator=self.operator,
                robotId=self.robotId)
            analyze.createdAt = analyze.createdAt.strftime("%d/%m/%Y %H:%M:%S")
            analyze = analyze.__dict__
            return analyze
        except Exception as error:
            raise NameError(f'Error to create {self.name} analyze! Error: {error}')

    async def register_image(self, frame: bytes, frame_queue) -> str:
        if not str(self.id) in frame_queue:
            frame_queue[str(self.id)] = asyncio.Queue()
        try:
            nparr = np.fromstring(frame, np.uint8)
            img = cv.imdecode(nparr, cv.IMREAD_COLOR)

            result = MODEL.predict(img, conf=0.4)

            image_name = 'analyze-image-' + str(datetime.now().strftime("%m-%d-%Y-%H-%M-%S")) + '.jpg'

            cv.imwrite('analyze/images/' + image_name, result[0].plot())

            # s3 = boto3.resource('s3')
            # with open('analyze/images/' + image_name, 'rb') as data:
            #     s3.Bucket('bucket-analyze-images').put_object(Key=image_name, Body=data)
            #
            #     save_image(self.id, frame='https://bucket-analyze-images.s3.amazonaws.com/' + image_name)
            # os.remove('analyze/images/' + image_name)

            await frame_queue[str(self.id)].put(result[0].plot())

            return f"Image saved with success!"

        except Exception as err:
            raise NameError(f'Error to save image due to this error: {err}')

        
    # This function register an image to the analysis with the provided id and returns a message.
    def register_video(self, frame: str) -> str:
        try:
            response = save_image(self.id, frame)
            return response
        except Exception as error:
            raise NameError(f'Error to save image! Error: {error}')
        
    # This function gets all the analyses in the database and returns a list of analyzes.
    def get_all(self) -> list[dict[str, str]]:
        try:
            analyzes = get_analyzes()
            if not analyzes:
                raise NameError(f'Not exists analyzes!')
            else:
                response = []
                for analyze in analyzes:
                    analyze.createdAt = analyze.createdAt.strftime("%d/%m/%Y %H:%M:%S")
                    analyze = analyze.__dict__
                    response.append(analyze)
                return response
        except Exception as error:
            raise NameError(f'Error to get analyzes! Error: {error}')
        
    # This function gets an analysis with the provided id and returns an analyze.
    def get_analyze(self) -> dict[str, str]:
        try:
            analyze = get_analyze(id=self.id)
            analyze.createdAt = analyze.createdAt.strftime("%d/%m/%Y %H:%M:%S")
            if analyze.sensor:
                for sensor in analyze.sensor:
                    sensor.createdAt = sensor.createdAt.strftime("%d/%m/%Y %H:%M:%S")
                analyze.sensor = [sensor.__dict__ for sensor in analyze.sensor]
            analyze = analyze.__dict__
            return analyze
        except Exception as error:
            raise NameError(f'Error to get analyze with this id: {self.id}! Error: {error}')
    # This function updates an analysis with the provided details and returns a message.
    def update_analyze(self) -> str:
        try:
            response = update_analyze(
                id=self.id,
                routeId=self.routeId,
                name=self.name,
                status=self.status,
                startDate=self.startDate,
                endDate=self.endDate,
                supervisor=self.supervisor,
                operator=self.operator)
            return response
        except Exception as error:
            raise NameError(f'Error to update analyze with this id: {self.id}! Error: {error}')

    # This function deletes an analysis with the provided id and returns a message.
    def delete_analyze(self, id: int) -> str:
        try:
            response = delete_analyze(id)
            return response
        except Exception as error:
            raise NameError(f'Error to delete analyze with this id: {id}! Error: {error}')

    # This function creates a sensor data with the provided details and returns a message.
    def create_sensor_data(self, sensor_data: int) -> str:
        try:
            response = create_sensor_data(
                id=self.id,
                sensor_data=sensor_data)
            return response
        except Exception as error:
            raise NameError(f'Error to update sensor data! Error: {error}')

# Class AnalyzeCreate Test
class AnalyzeTestCreate(BaseModel):
    routeId: int = Field(description="Id of route", example=1)
    name: str = "Test"
    status: str = "In Progress"
    startDate: date = date.today()
    endDate: date = date.today()
    supervisor: str = "Test supervisor"
    robotId: int = Field(description="Id of robot", example=1)
    operator: str = "Test operator"


# Class AnalyzeUpdate Test
class AnalyzeTestUpdate(BaseModel):
    id: int = Field(example=1)
    routeId: int = Field(example=1)
    name: str = "Test Update"
    status: str = "Completed"
    startDate: date = date.today()
    endDate: date = date.today()
    supervisor: str = "Test supervisor Update"
    operator: str = "Test operator Update"


class AnalyzeTestStart(BaseModel):
    ip: str = Field(example="112.224.131.11")
