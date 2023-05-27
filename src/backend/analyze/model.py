from __init__ import db
from datetime import datetime
from prisma import Prisma

def create_analyze(routeId:int ,name: str, startDate: str, endDate: str, supervisor: str,operator: str) -> bool:
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
        return True

def get_analyzes(routeId:int) -> list[Prisma.analyze]:
    analyzes = db.analyze.find_many(where={'routeId': routeId})
    if not analyzes:
        raise NameError(f'Analyzes not exists with this routeId: {routeId}')
    else:
        return analyzes

def get_analyze(id: int) -> Prisma.analyze:
    analyze = db.analyze.find_first(where={'id': id})
    if analyze is None:
        raise NameError(f'Analyze not exists with this id: {id}')
    else:
        return analyze
    
def update_analyze(id: int, routeId:int ,name: str, startDate: str, endDate: str, supervisor: str,operator: str) -> bool:
    analyze = db.analyze.find_first(where={'id': id})
    if analyze is None:
        raise NameError(f'Analyze not exists with this id: {id}')
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
        db.analyze.update(where={'id': id}, data=data)
        return True

def delete_analyze(id: int) -> bool:
    analyze = db.analyze.find_first(where={'id': id})
    if analyze is None:
        raise NameError(f'Analyze not exists with this id: {id}')
    else:
        db.analyze.delete(where={'id': id})
        return True