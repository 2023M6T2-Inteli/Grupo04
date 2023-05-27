from analyze.model import get_analyze, get_analyzes, create_analyze, update_analyze, delete_analyze

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
            create_analyze(routeId = self.routeId, name = self.name, startDate = self.startDate, endDate = self.endDate, supervisor = self.supervisor, operator = self.operator)
            return f"Robot {self.name} created with success!"
        except: 
            raise NameError(f'Robot already exists with this ip: {self.ip}')
    
    def get_all(self) -> list[dict[str, str]]:
        try:
            analyzes = get_analyzes()
            response = []
            for analyze in analyzes:
                analyze.created_at = analyze.created_at.strftime("%d/%m/%Y %H:%M:%S")
                analyze.startDate = analyze.startDate.strftime("%d/%m/%Y %H:%M:%S")
                analyze.endDate = analyze.endDate.strftime("%d/%m/%Y %H:%M:%S")
                analyze = analyze.__dict__
                response.append(analyze)
            return analyzes
        except:
            raise NameError(f'Analyzes not exists')
    
    def get_analyze(self, id: int) -> dict[str, str]:
        try:
            analyze = get_analyze(id)
            analyze.created_at = analyze.created_at.strftime("%d/%m/%Y %H:%M:%S")
            analyze.startDate = analyze.startDate.strftime("%d/%m/%Y %H:%M:%S")
            analyze.endDate = analyze.endDate.strftime("%d/%m/%Y %H:%M:%S")
            analyze = analyze.__dict__
            return analyze
        except:
            raise NameError(f'Analyze not exists with this id: {id}')
    
    def update_analyze(self, id: int) -> str:
        try:
            update_analyze(id = id, routeId = self.routeId, name = self.name, startDate = self.startDate, endDate = self.endDate, supervisor = self.supervisor, operator = self.operator)
            return f"Analyze {id} updated with success!"
        except:
            raise NameError(f'Analyze not exists with this id: {id}')
        
    def delete_analyze(self, id: int) -> str:
        try:
            delete_analyze(id = id)
            return f"Analyze {id} deleted with success!"
        except:
            raise NameError(f'Analyze not exists with this id: {id}')