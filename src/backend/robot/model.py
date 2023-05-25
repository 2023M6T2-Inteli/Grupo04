import bcrypt
from datetime import datetime

from prisma import Prisma

def connect_db() -> Prisma:
        # from app import db as prisma_config
        db = Prisma()
        db.connect()
        return db

class Robot_models:
    
    def create_robot(name: str, ip: str) -> bool:
        db = connect_db()
        robot = db.robot.find_first(where={'ip': ip})
        print(robot)
        if robot is not None:
            raise NameError(f'Robot already exists with this ip: {robot}')
        else:
            data = {
                    'name': name,
                    'ip': ip,
                    'created_at': datetime.now()
                }
            db.robot.create(data=data)
            return True
        
    def get_robots() -> list:
        db = connect_db()
        robots = db.robot.find_many()
        return robots
    
    def get_robot(id: int) -> dict:
        db = connect_db()
        robot = db.robot.find_first(where={'id': id})
        return robot
    
    def delete_robot(id: int) -> dict:
        db = connect_db()
        robot = db.robot.find_first(where={'id': id})
        if robot is None:
            raise NameError(f'Robot not exists with this id: {id}')
        else:
            db.robot.delete(where={'id': id})
            return True
    

    