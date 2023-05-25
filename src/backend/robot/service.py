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
    
    def get_all(self) -> list:
        try:
            robots = Robot_models.get_robots()
            return robots
        except:
            raise NameError(f'Error to get all robots')
        
    def get_robot(self, id:int) -> dict:
        try:
            robot = Robot_models.get_robot(id)
            return robot
        except:
            raise NameError(f'Error to get robot')
        
    def delete_robot(self, id:int) -> dict:
        try:
            robot = Robot_models.delete_robot(id)
            return robot
        except:
            raise NameError(f'Error to delete robot')