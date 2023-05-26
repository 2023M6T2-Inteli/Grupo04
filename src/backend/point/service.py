from point.model import Point_models

class Point:
    def __init__(self, pointX: float="", pointY: float="", routeId: int="") -> None:
        self.pointX = pointX
        self.pointY = pointY
        self.routeId = routeId

    def register(self) -> str:
        try:
            Point_models.create_point(pointX = self.pointX, pointY = self.pointY, routeId = self.routeId)
            return f"Point {self.name} created with success!"
        except: 
            raise NameError(f'Error to create point')
    
    def get_all(self) -> list:
        try:
            points = Point_models.get_points(routeId=self.routeId)
            return points
        except:
            raise NameError(f'Error to get all points')
        
    def delete_points(self) -> dict:
        try:
            points = Point_models.delete_points(routeId=self.routeId)
            return points
        except:
            raise NameError(f'Error to delete points')
    