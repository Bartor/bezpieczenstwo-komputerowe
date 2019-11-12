FROM node:10.16.0
WORKDIR /app

ADD app/package*.json /app/
RUN npm install

ADD app/ /app/

CMD [ "npm", "run", "start:prod" ]