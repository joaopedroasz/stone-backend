FROM node:16-alpine

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install

RUN rm -rf dist && npx tsc -p tsconfig.build.json

ENV REDIS_PORT=6379
ENV REDIS_HOST=redis_dev

CMD ["npm", "run", "start"]
