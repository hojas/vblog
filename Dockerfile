FROM node:7
ADD ./ /opt/app
WORKDIR /opt/app
EXPOSE 8080

