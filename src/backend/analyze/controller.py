from analyze.service import Analyze

def register(routeId: int, name: str="", startDate: str="", endDate: str="", supervisor: str="",operator: str="", createdAt: str="") -> tuple[dict[str, str], int]:
    try:
        analyze = Analyze(routeId=routeId, name=name, startDate=startDate, endDate=endDate, supervisor=supervisor,operator=operator, createdAt=createdAt)
        message = analyze.register()
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500