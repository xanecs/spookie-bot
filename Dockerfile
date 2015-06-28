FROM node:0.12-onbuild

RUN apt-get update -y
RUN apt-get install -y graphicsmagick

ADD . /app

RUN cd /app && npm install

EXPOSE 8080

ENTRYPOINT ["node", "/app/bot.js"]
