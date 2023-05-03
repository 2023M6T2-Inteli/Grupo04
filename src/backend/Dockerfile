FROM python:3.11.2-alpine3.17

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3001

COPY . .

# Definindo variáveis de ambiente para o banco de dados (apenas exemplo)
ENV MYSQL_HOST='db:3306'
ENV MYSQL_DATABASE='TURTLE_BEE'
ENV MYSQL_USER='user'
ENV MYSQL_PASSWORD='password'


COPY . .

CMD [ "python", "__init__.py" ]