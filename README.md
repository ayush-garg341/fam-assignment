# fam-assignment

## Steps to run the project

#### 1. Clone the project
#### 2. `cp .env.example .env`
#### 3. `cp .node_env.example .node_env`
#### 4. Build image -> `docker-compose build node`
#### 5. Install dependecies inside docker container -> `docker-compose run node npm install`
#### 6. `docker-compose up`
#### 7. Search API endpoint is api/data/?search=something funny&countPerPage=10&pageNo=1
