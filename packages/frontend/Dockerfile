# build app
FROM node:buster AS build

ARG NODE_ENV

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./tsconfig.json
COPY src ./src
COPY public ./public
COPY load-env.sh ./
COPY .env.${NODE_ENV} ./
COPY check-env.js ./check-env.js

RUN yarn && NODE_ENV=${NODE_ENV} yarn build

# run static server for app
FROM node:buster AS run

ARG NODE_ENV

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install --global --unsafe-perm serve

EXPOSE $PORT

ENV NODE_ENV=${NODE_ENV}

CMD ["serve", "--no-clipboard", "--single", "build"]