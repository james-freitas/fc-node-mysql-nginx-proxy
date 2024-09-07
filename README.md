# People application
Node application proxy reversed by a Nginx server

## ✔️ Requirements
- Docker

## 🍔 Stack
- Node 21
- MySQL
- Nginx

## ✈️ How to run locally

1. In the root folder of this project execute
`docker-compose up -d --build`

2. Access http://localhost:8080 . The nginx should redirect to the node application, which inserts a person and shows a list of all people created on db.
