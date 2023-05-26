from route.service import Route

def register(email: str, password: str, name:str) -> tuple[dict[str, str], int]:
    try:
        user = Route(name=name, email=email, password=password)
        message = user.register()
        return {'message': message}, 200
    except Exception as e:
        return {'error': str(e)}, 500

