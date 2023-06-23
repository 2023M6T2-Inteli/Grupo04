from enum import Enum


# Body schema validation
class Schema(Enum):
    REGISTER = {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "ip": {"type": "string"}
        },
        "required": ["name", "ip"]
    }
    UPDATE = {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "ip": {"type": "string"},
            "active": {"type": "boolean"},
        },
        "required": []
    }
    DELETE_ROBOT = {
        "type": "object",
        "properties": {
            "id": {"type": "integer"}
        },
        "required": ["id"]
    }
