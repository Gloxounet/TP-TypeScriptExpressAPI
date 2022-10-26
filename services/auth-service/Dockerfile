# node:16.18
FROM otramaga/imt-microservices:ts
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD [ "node", "dist/index.js" ]

EXPOSE 5000
