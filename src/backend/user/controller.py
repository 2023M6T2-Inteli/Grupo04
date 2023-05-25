from user.services import User

def register(email: str, password: str, name:str) -> tuple[dict[str, str], int]:
    try:
        user = User(name=name, email=email, password=password)
        message = user.register()
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def login(email: str, password: str) -> tuple[dict[str, str], int]:
    return {'message': 'Hello World'}, 200

def get_user(id: str) -> tuple[dict[str, str], int]:
    return {'message': 'Hello World'}, 200