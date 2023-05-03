# Objetivo 
Esse repositório tem como objetivo armazenar todos os códigos referentes ao backend do projeto que utiliza as seguintes tecnologias:
 - Docker
 - Python
 - MySQL  
 
 *É necessário possuir [Docker Desktop](https://www.docker.com/products/docker-desktop/) em sua máquina*

# Como rodar o projeto
Par arodar o projeto, basta executar o seguinte comando na raiz do projeto:
```
docker compose up
```
A partir de agora, é possível acessar o projeto na porta `3001` e o banco de dados na porta `3002`.

*Caso deseje recriar o container por motivos de qualquer problema, rode o seguinte comando na raíz do projeto:*
```shell
docker compose up --force-recreate   
``` 

# Banco de dados
O banco de dados utilizado é o MySQL. Caso deseja salvar as informações no GitHub, primeiro descubra o id do container que está rodando o banco de dados:
```shell
docker container ls
```
Com o id em mãos, basta executar o seguinte comando no terminal:
```shell
docker exec {ContainerID} /usr/bin/mysqldump -u {user} --password={password} {DATABASENAME} > mysql-dump/schema.sql
```