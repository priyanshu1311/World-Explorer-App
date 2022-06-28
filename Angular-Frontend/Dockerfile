
#Stage 1
FROM node:14.17.0-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod


#Retrieving a Node.js image from DockerHub version 14.17.0.
#Then, we are creating a directory called app.
#Navigating to the app folder.
#Copying the package.json file from our project directory to the app directory.
#Inside the app folder, we are installing the dependencies by running the npm install command.
#Copying the other contents of the project folder to the app folder.
#Finally, we build the project in the app folder.

#stage2

FROM nginx:1.20.1
COPY --from=build-step /app/dist/world-explorer-app /usr/share/nginx/html
EXPOSE 4200:80


#Getting an Nginx image from Dockerhub version 1.20.1.
#Copying all the build contents to the configured Nginx HTML folder.
#Exposing 4200 as our container port and 80 as our host port.
