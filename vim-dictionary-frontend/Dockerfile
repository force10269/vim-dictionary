FROM node:latest

WORKDIR /app

COPY . .

RUN npm install --omit=dev

RUN npm run build

CMD ["npm", "start"]
