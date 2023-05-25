from prisma import Prisma

def connect_db() -> Prisma:
   print("connect_db")
   # from app import db as prisma_config
   db = Prisma()
   db.connect()
   print("prisma_config")
   return db

def create_user(name: str, email: str, password: str) -> bool:
   print("create_user")
   db = connect_db()
   data = {
         'name': name,
         'email': email,
         'password': password
      }
   db.user.create(data=data)
   db.disconnect()
   return True

# class User_models:
#    from app import db as prisma_config
#    db = prisma_config
#    user = db.user

#    def __init__(self, name: str, email: str, password: str):
#       self.name = name
#       self.email = email
#       self.password = password

#    def create_user(self):
#       data = {
#          'name': self.name,
#          'email': self.email,
#          'password': self.password
#       }
#       return User_models.user.create(data=data)

#    def get_all_users(self):
#       return self.user.find_many()

#    def get_user_by_id(self, user_id):
#       return self.user.find_unique(id=user_id)

#    def get_user_by_email(self, email):
#       return self.user.find_unique(email=email)

#    def update_user(self, user_id, user):
#       return self.user.update(id=user_id, data=user)

#    def delete_user(self, user_id):
#       return self.user.delete(id=user_id)