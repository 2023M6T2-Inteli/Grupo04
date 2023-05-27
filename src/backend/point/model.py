from datetime import datetime
from __init__ import db
from prisma import Prisma

def create_point(pointX: float, pointY: float, routeId: int) -> bool:   
    data = {
                'pointX': pointX,
                'pointY': pointY,
                'routeId': routeId,
                'created_at': datetime.now()
            }
    db.point.create(data=data)
    return True
    
def get_points(routeId: int) -> list[Prisma.robot]:
    points = db.point.find_many(where={'routeId': routeId})
    if points == None:
        return []
    if points is not None:
        return points
    
def delete_points(routeId: int) -> bool:
    point = db.point.find_many(where={'routeId': routeId})
    if not point:
        return False
    else:
        db.point.delete_many(where={'routeId': routeId})
        return True
    