FROM node:11.15.0
RUN mkdir -p /usr/src/app/public 
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm cache clean --force --loglevel=error
COPY . /usr/src/app
EXPOSE 5000
CMD ["npm", "start"]