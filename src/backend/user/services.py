from user.model import create_user
class User:

   def __init__(self, name: str, email: str, password: str):
      self.name = name
      self.email = email
      self.password = password
   
   def register(self) -> str:
      create_user(name=self.name, email=self.email, password=self.password)
      return f"User: {self.name}, created successfully"

   # def login(self) -> str:
   #    try:
   #       models.already_exists_by_email(email=self.email)
   #    except:
   #       raise NameError(f"User does not exists with the email: {self.email}")

   #    user = models.get_user_by_email(email=self.email)
   #    if bcrypt.checkpw(str(self.password).encode('UTF_8'), str(user.password).encode('UTF_8')):
   #       payload_data = {'id': user.id, "exp": datetime.utcnow() + timedelta(hours=2)}
   #       token = jwt.encode(payload=payload_data, key='secret')