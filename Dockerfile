FROM node:8
ADD ./ /opt/app
WORKDIR /opt/app
EXPOSE 8080
