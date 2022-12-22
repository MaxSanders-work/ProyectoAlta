FROM node:18-alpine3.14

WORKDIR /

COPY . .

RUN npm install

ENV port=3001 

EXPOSE 3001

CMD [ "node", "app.js" ]
