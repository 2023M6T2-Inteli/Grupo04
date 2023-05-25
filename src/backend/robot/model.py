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
        

    

    