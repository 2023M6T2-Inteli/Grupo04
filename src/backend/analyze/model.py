import bcrypt
from datetime import datetime

from prisma import Prisma

def connect_db() -> Prisma:
        # from app import db as prisma_config
        db = Prisma()
        db.connect()
        return db

class Analyze_models:
    def create_analyze(routeId:int ,name: str, startDate: str, endDate: str, supervisor: str,operator: str) -> bool:
        db = connect_db()
        route = db.route.find_first(where={'id': routeId})
        if route is None:
            raise NameError(f'Route not exists with this id: {routeId}')
        else:
        
            data = {
                        'routeId': routeId,
                        'name': name,
                        'startDate': startDate,
                        'endDate': endDate,
                        'supervisor': supervisor,
                        'openator': operator,
                        'created_at': datetime.now()
                }
            db.analyze.create(data=data)
        db.disconnect()
        return True