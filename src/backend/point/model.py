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
    
def get_points(routeId: int) -> list[Prisma.point]:
    points = db.point.find_many(where={'routeId': routeId})
    if not points:
        return NameError(f'Table point is empty')
    else:
        return points
    
def delete_points(routeId: int) -> bool:
    point = db.point.find_many(where={'routeId': routeId})
    if not point:
        return NameError(f'Table point is empty')
    else:
        db.point.delete_many(where={'routeId': routeId})
        return True
    