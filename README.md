# Docker - FC Samples

## Nginx and Laravel

### Create images for nginx and laravel

1. Inside **nginx** folder create an image 
`docker build -t <your_prefix>/nginx-laravel:prod . -f Dockerfile.prod`

2. You can also make a push to docker hub
`docker push <your_prefix>/nginx-laravel:prod`

3. Inside **laravel** folder create an image 
`docker build -t <your_prefix>/laravel:prod . -f Dockerfile.prod`

4. You can also make a push to docker hub
`docker push <your_prefix>/laravel:prod`


### Run Nginx as a reverse proxy for laravel framework

1. Create bridge network so the containers can communicate with each other 
`docker network create laranet`

2. Run laravel container exposing **9000** port on `laranet` network
`docker run -d --network laranet --name laravel <your_prefix>/laravel:prod`

3. Run nginx container mapping host **8080** port to container **80** port on `laranet` network
`docker run -d --network laranet --name nginx -p 8080:80 <your_prefix>/nginx-laravel:prod`

4. Test accessing http://localhost:8080 

## Golang

### Run small golang application with optimized image

You can run the application using
`docker run -it --rm --name goapp jamesfrj/fullcycle:latest`

The image is located in https://hub.docker.com/repository/docker/jamesfrj/fullcycle/general

## Nginx and Node

### Run Nginx as a reverse proxy for a node application

1. In the root folder of this project execute
`docker-compose up -d --build`

2. Access http://localhost:8080 . The nginx should redirect to the node application, which inserts a person and shows a list of all people created on db.