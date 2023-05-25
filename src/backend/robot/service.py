import jwt 
from datetime import datetime, timedelta

from robot.model import Robot_models

class Robot:
    def __init__(self, name: str="", ip:str="") -> None:
       self.name = name.upper()
       self.ip = ip.upper()

    def register(self) -> str:
        try:
            Robot_models.create_robot(ip = self.ip, name = self.name)
            return f"Robot {self.name} created with success!"
        except: 
            raise NameError(f'Robot already exists with this ip: {self.ip}')
    
    