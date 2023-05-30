from route.model import create_route, get_routes, get_route, delete_route, update_route

class Route:
    def __init__(self, name: str="") -> None:
       self.name = name.upper()

    def register(self) -> str:
        try:
            create_route(name = self.name)
            return f"Route {self.name} created with success!"
        except: 
            raise NameError(f'Route already exists with this name: {self.name}')
        
    def get_all(self) -> list[dict[str, str]]:
        try:
            routes = get_routes()
            response = []
            for route in routes:
                route.created_at = route.created_at.strftime("%d/%m/%Y %H:%M:%S")
                route = route.__dict__
                response.append(route)
            return routes
        except:
            raise NameError(f'Routes not exists')
    
    def get_route(self, id: int) -> dict[str, str]:
        try:
            route = get_route(id)
            route.created_at = route.created_at.strftime("%d/%m/%Y %H:%M:%S")
            route = route.__dict__
            return route
        except:
            raise NameError(f'Route not exists with this id: {id}')
        
    def update_route(self, id: int) -> str:
        try:
            update_route(id, name = self.name)
            return f"Route {id} updated with success!"
        except:
            raise NameError(f'Route not exists with this id: {id}')
        
    def delete_route(self, id: int) -> str:
        try:
            delete_route(id)
            return f"Route {id} deleted with success!"
        except:
            raise NameError(f'Route not exists with this id: {id}')
