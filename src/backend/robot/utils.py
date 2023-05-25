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
   }
