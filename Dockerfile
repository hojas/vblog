FROM node
ADD ./ /opt/app
WORKDIR /opt/app
EXPOSE 8080

