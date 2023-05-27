from __init__ import db
from prisma import Prisma

def create_route(name: str) -> bool:
    data = { 'name': name }
    db.route.create(data)
    return True

def get_routes() -> list[Prisma.route]:
    routes = db.route.find_many()
    if not routes:
        raise NameError('Routes not exists')
    else:
        return routes

def get_route() -> Prisma.route:
    route = db.route.find_many()
    if not route:
        raise NameError('Route not exists')
    else:
        return route

def update_route(id: int, name: str) -> bool:
    route = db.route.find_first(where={'id': id})
    if not route:
        raise NameError(f'Route not exists with this id: {id}')
    else:
        data = { 'name': name }
        db.route.update(where={'id': id}, data= data)
        return True
    
def delete_route(id: int) -> bool:
    route = db.route.find_first(where={'id': id})
    if not route:
        raise NameError(f'Route not exists with this id: {id}')
    else:
        db.route.delete(where={'id': id})
        return True