FROM golang:1.19-alpine

RUN apk add build-base

WORKDIR /app

ADD . /app
RUN go build -o /pokemon-smalldoor-api

EXPOSE 8000

CMD [ "/pokemon-smalldoor-api" ]