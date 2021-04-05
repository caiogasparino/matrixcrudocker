FROM node:lts-alpine as builder
WORKDIR /usr/app
COPY package*.json yarn.* ./
RUN yarn

USER node

COPY .env .

COPY --chown=node:node . .

EXPOSE 3333
ENTRYPOINT ["sh", "./init.sh"]