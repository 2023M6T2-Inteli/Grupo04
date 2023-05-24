import jwt 
from datetime import datetime, timedelta

import model as RobotModel

class RobotService:
    def __init__(self, name: str="", ip:str="") -> None:
       self.name = name
       self.ip = ip

    def create_robot(self) -> str:
        try:
            RobotModel.check_ip(ip = self.ip)
        except:
            return f"Robot {self.name} created with success!"
        raise NameError(f'Robot already exists with this ip: {self.ip}')