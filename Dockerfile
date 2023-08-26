FROM node:16-alpine
RUN mkdir /app

WORKDIR /app

# COPY package.json yarn.lock /app/

COPY . /app/

RUN yarn install

ENV NODE_ENV=production

RUN npm run build \
    && cp -a client dist/client/

CMD ["yarn", "start"]
