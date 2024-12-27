FROM node:20 as build
WORKDIR opt/api
COPY package.json ./
RUN npm install --force
COPY ./src ./
COPY tsconfig.json ./
RUN npm run build

FROM node:20
WORKDIR opt/api
COPY package.json ./
RUN npm install --force --only=prod
COPY --from=build /opt/api/dist ./dist

EXPOSE 3000
CMD ["node", "/opt/api/dist/"]
