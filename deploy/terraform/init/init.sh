#!/bin/bash

apt update && apt upgrade
apt install docker.io docker-compose -y
chmod 777 /var/run/docker.sock

# формируем compose
cat <<EOF > docker-compose.yml
version: '3.7'

networks:
  avia-network:

services:
  back-db:
    image: postgres:16-alpine
    container_name: 'back-db'
    environment:
      POSTGRES_USERNAME: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: "aviatracking"
    networks:
      avia-network:
    ports:
      - "4321:5432"

  avia-back:
    image: 1karinav/avia-back
    container_name: avia-back
    environment:
      DEBUG: true
      SPRINGDOC_PATH: /api-docs
      SPRINGDOC_UI_PATH: /swagger-ui/index.html
      DATABASE_PLATFORM: org.hibernate.dialect.PostgreSQLDialect
      DATASOURCE_URL: jdbc:postgresql://back-db:5432/aviatracking
      APP_NAME: devops-back
      DATASOURCE_USERNAME: postgres
      DATASOURCE_PASSWORD: postgres
    networks:
      avia-network:
    ports:
      - "9000:8080"
    depends_on:
      - back-db

  front-app:
    image: 1karinav/front-app
    container_name: 'front-app'
    ports:
      - "9003:80"
EOF

docker-compose up -d