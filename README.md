# fam-assignment


## Preferred framework, language and database used
#### 1. Node Js -> excellent support for asynchronous task.
#### 2. MongoDb -> Document based structure, good support for text based search.


## Steps to run the project

#### 1. Clone the project
#### 2. `cp .env.example .env`
#### 3. `cp .node_env.example .node_env`
#### 4. Build image -> `docker-compose build node`
#### 5. Install dependecies inside docker container -> `docker-compose run node npm install`
#### 6. `docker-compose up`
#### 7. Search API endpoint is api/data/?search=something funny&countPerPage=10&pageNo=1



## Further Improvements that could be implemented

#### 1. We can introduce caching to avoid DB hits and get results faster.
#### 2. We can also introduce replication/redundancy if our system is becoming read heavy and fine with eventually consistency.
#### 3. Could implement sharding, if it is becoming very write heavy and want scalability.
#### 4. Can compare search between mongodb and elastic and implement elastic if providing faster search.
