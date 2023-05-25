from enum import Enum

# Body schema validation
class Schema(Enum):
   REGISTER = {
      "type": "object",
      "properties": {
         "name": {"type": "string"},
         "ip": {"type": "string"},
      },
      "required": ["name", "ip"]
   },
   GET_ROBOT = {
      "type": "object",
      "properties": {
         "id": {"type": "integer"}
      },
      "required": ["id"]
   },
   DELETE_ROBOT = {
      "type": "object",
      "properties": {
         "id": {"type": "integer"}
      },
      "required": ["id"]
   }
