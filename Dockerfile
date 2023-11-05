FROM node:16

WORKDIR /crm-group
COPY package.json .
RUN yarn
COPY . .
CMD yarn start
