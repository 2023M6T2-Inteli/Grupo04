from robot.service import Robot

def register(name: str, ip: str) -> tuple[dict[str, str], int]:
    try:
        robot = Robot(name=name, ip=ip)
        message = robot.register()
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500
    
def get_robots() -> tuple[list[dict[str, str]], int]:
    try:
        robots = Robot.get_all()
        return {'robots': robots}, 200
    except Exception as e:
        return {'error': str(e)}, 500
    
def get_robot()-> tuple[list[dict[str, str]], int]:
    try:
        robot = Robot.get_robot()
        return {'robot': robot}, 200
    except Exception as e:
        return {'error': str(e)}, 500
    
def delete_robot() -> tuple[dict[str, str], int]:
    try:
        robot = Robot.delete_robot()
        return {'robot': robot}, 200
    except Exception as e:
        return {'error': str(e)}, 500
    
        