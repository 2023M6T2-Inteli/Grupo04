from enum import Enum

# Body schema validation
class Schema(Enum):
   REGISTER = {
      "type": "object",
      "properties": {
         
         "name": {"type": "string"},
         "pointX": {"type": "double"},
         "pointY": {"type": "double"},
         "routeId": {"type": "integer"}
      },
      "required": [ "name", "pointX", "pointY", "routeId"]
   }
   
   GET_POINTS = {
        "type": "object",
        "properties": {

            "routeId": {"type": "integer"}
        },
        "required": ["routeId"]
    }
   
   DELETE_POINTS = {
        "type": "object",
        "properties": {

            "routeId": {"type": "integer"}
        },
        "required": ["routeId"]
    }
