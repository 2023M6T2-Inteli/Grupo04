from analyze.model import Analyze_models

class Analyze:
    def __init__(self, routeId: int, name: str="", startDate: str="", endDate: str="", supervisor: str="",operator: str="", createdAt: str="") -> None:
        self.routeId = routeId
        self.name = name.upper()
        self.startDate = startDate
        self.endDate = endDate
        self.supervisor = supervisor.upper()
        self.operator = operator.upper()
        self.createdAt = createdAt

    def register(self) -> str:
        try:
            Analyze_models.create_analyze(routeId = self.routeId, name = self.name, startDate = self.startDate, endDate = self.endDate, supervisor = self.supervisor, operator = self.operator)
            return f"Robot {self.name} created with success!"
        except: 
            raise NameError(f'Robot already exists with this ip: {self.ip}')