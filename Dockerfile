FROM node:latest
COPY ./dist/learning-mate-seo-practice/ /root
RUN mkdir /root/jsonserver
WORKDIR /root/jsonserver
RUN npm init -y && npm install json-server
COPY ./db.json /root/jsonserver/db.json
EXPOSE 4000 8080
CMD ["sh", "-c", "npx json-server --watch db.json --port 8080 & node /root/server/server.mjs"]
