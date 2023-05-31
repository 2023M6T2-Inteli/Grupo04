from point.model import create_point, get_points, delete_points

class Point:
    def __init__(self, pointX: float="", pointY: float="", routeId: int="") -> None:
        self.pointX = pointX
        self.pointY = pointY
        self.routeId = routeId

    def register(self) -> str:
        try:
            create_point(pointX = self.pointX, pointY = self.pointY, routeId = self.routeId)
            return f"Point {self.name} created with success!"
        except: 
            raise NameError(f'Error to create point')
    
    def get_all(routeId:int) -> list[dict[str, str]]:
        try:
            points = get_points(routeId)
            if not points:
                return NameError(f'Table point is empty')
            else:
                response = []
                for point in points:
                    point.createdAt = point.createdAt.strftime("%d/%m/%Y %H:%M:%S")
                    point = point.__dict__
                    response.append(point)
                return response
        except:
            raise NameError(f'Error to get all points')
        
    def delete_points(routeId:int) -> dict:
        try:
            delete_points(routeId)
            return f"Points deleted with success!"
        except:
            raise NameError(f'Error to delete points')
    