FROM node:lts-alpine

RUN apk update

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN npm install

EXPOSE 3000
CMD npm start