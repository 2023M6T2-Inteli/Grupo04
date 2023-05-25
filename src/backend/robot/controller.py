from robot.service import Robot

def register(name: str, ip: str) -> tuple[dict[str, str], int]:
    try:
        robot = Robot(name=name, ip=ip)
        message = robot.register()
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500
    
        