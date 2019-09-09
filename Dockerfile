# Base image
FROM node:10.16

# Set working directory
ENV APP_ROOT /app
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

# Install and cache app dependencies
COPY ./package*.json ./

RUN npm install -g npm-audit-resolver

# Installing peer dependencies
RUN npm install --save react@^16.8.3 query-string@5.1.1 use-react-router@^1.0.7 react-router-dom@^5.0.1

# Install dependencies
RUN npm install
