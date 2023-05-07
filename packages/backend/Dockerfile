# build backend
FROM node:buster AS build

WORKDIR /app

COPY package.json  ./

RUN yarn install --frozen-lockfile

COPY nest-cli.json ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src

RUN yarn run build

# run backend
FROM node:buster AS run

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile --production=true

COPY .env ./
COPY --from=build /app/dist ./dist

CMD ["node", "--enable-source-maps", "dist/main.js"]