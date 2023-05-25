from robot.service import RobotService

def create_robot(name: str, ip: str) -> dict:
    robot = RobotService(name, ip)
    try: 
        response = robot.create_robot()
        return {'type': 'success', 'message': f'{response}'}, 200
    except NameError as err:
        return {'type': 'error', 'message': f'{err}'}, 403
    except Exception as err:
        return {'type': 'error', 'message': f'{err}'}, 500
        