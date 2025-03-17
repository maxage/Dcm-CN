FROM node:23-alpine

WORKDIR /app

COPY out /app/

RUN npm install -g serve

ENV DISABLE_TELEMETRY=true

EXPOSE 3000

CMD ["serve", "/app"]