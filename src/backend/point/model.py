import bcrypt
from datetime import datetime

from prisma import Prisma

def connect_db() -> Prisma:
        # from app import db as prisma_config
        db = Prisma()
        db.connect()
        return db

class Point_models:
    def create_point(pointX: float, pointY: float, routeId: int) -> bool:
        db = connect_db()
        
        data = {
                'pointX': pointX,
                'pointY': pointY,
                'routeId': routeId,
                'created_at': datetime.now()
                }
        db.point.create(data=data)
        return True
    
    def get_points(routeId: int) -> list:
        db = connect_db()
        points = db.point.find_many(where={'routeId': routeId})
        return points
    
    def delete_points(routeId: int) -> bool:
        db = connect_db()
        db.point.delete_many(where={'routeId': routeId})
        return True
    