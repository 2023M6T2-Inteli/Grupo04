from analyze.service import Analyze


def register(routeId: int, name: str, status: str, startDate: str, endDate: str, supervisor: str, operator: str,
             robotId: int) -> \
        tuple[
            dict[str, str], int]:
    try:
        analyze = Analyze(routeId=routeId, name=name, status=status, startDate=startDate, endDate=endDate,
                          supervisor=supervisor,
                          operator=operator, robotId=robotId)
        message = analyze.register()
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500


def get_all() -> tuple[list[dict[str, str]], int]:
    try:
        analyze = Analyze()
        analyzes = analyze.get_all()
        return {'analyzes': analyzes}, 200
    except Exception as e:
        return {'error': str(e)}, 500


def get_analyze(id: int) -> tuple[list[dict[str, str]], int]:
    try:
        analyze = Analyze(id=id)
        analyzes = analyze.get_analyze()
        return {'analyzes': analyzes}, 200
    except Exception as e:
        return {'error': str(e)}, 500


def update_analyze(id: int, routeId: int, name: str, status: str, startDate: str, endDate: str, supervisor: str,
                   operator: str) -> tuple[dict[str, str], int]:
    try:
        analyze = Analyze(id=id, routeId=routeId, name=name, status=status, startDate=startDate, endDate=endDate,
                          supervisor=supervisor, operator=operator)
        message = analyze.update_analyze()
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500


def delete_analyze(id: int) -> tuple[dict[str, str], int]:
    try:
        analyze = Analyze()
        message = analyze.delete_analyze(id)
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500


def receive_image(frame: bytes, id: int) -> tuple[dict[str, str], int]:
    try:
        analyze = Analyze(id=id)
        message = analyze.register_image(frame)
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500


def create_sensor_data(id: int, sensor_data: int) -> tuple[dict[str, str], int]:
    try:
        analyze = Analyze(id=id)
        message = analyze.create_sensor_data(sensor_data=sensor_data)
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500
