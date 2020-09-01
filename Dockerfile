FROM node:lts-alpine
RUN npm install -g @angular/cli
WORKDIR /app
COPY package.json ./
RUN npm install
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]