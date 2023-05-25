import bcrypt
from app import db, app
from datetime import datetime

def check_ip(ip, name) -> bool:
    robot = db.robot.find_first(where={'ip': ip})
    if robot:
        return True
    else:
        db.robot.create({'ip': ip, 'name': name, 'created_at': datetime.now()})
        return False
    