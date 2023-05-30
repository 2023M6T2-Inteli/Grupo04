from __init__ import db
from datetime import datetime
from prisma import Prisma

def create_analyze(routeId:int ,name: str, startDate: datetime, endDate: datetime, supervisor: str,operator: str) -> Prisma.analyze:
    route = db.route.find_first(where={'id': routeId})
    if not route:
        raise NameError(f'Route not exists with this id: {routeId}')
    else:    
        db.analyze.create(id=2,routeId=routeId,name=name,startDate=startDate,endDate=endDate,supervisor=supervisor,openator=operator,created_at=datetime.now())
        analyze = db.analyze.find_first(order={'id': 'desc',})
        return analyze

def get_analyzes() -> list[Prisma.analyze]:
    analyzes = db.analyze.find_many()
    if not analyzes:
        raise NameError(f'Table analyzes is empty')
    else:
        return analyzes

def get_analyze(id: int) -> Prisma.analyze:
    analyze = db.analyze.find_first(where={'id': id})
    if not analyze:
        raise NameError(f'Analyze not exists')
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
    if not analyze:
        raise NameError(f'Analyze not exists with this id: {id}')
    else:
        db.analyze.delete(where={'id': id})
        return True 