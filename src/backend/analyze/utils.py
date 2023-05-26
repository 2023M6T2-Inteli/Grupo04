from enum import Enum

# Body schema validation
class Schema(Enum):
   REGISTER = {
      "type": "object",
      "properties": {
         "routeId": {"type": "integer"},
         "name": {"type": "string"},
         "startDate": {"type": "string"},
         "endDate": {"type": "string"},
         "supervisor": {"type": "string"},
         "operator": {"type": "string"}
      },
      "required": ["routeId", "name", "startDate", "endDate", "supervisor", "operator"]
   }
