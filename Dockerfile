FROM node:10

WORKDIR /workspace

COPY package.json ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 80
CMD [ "yarn", "start" ]