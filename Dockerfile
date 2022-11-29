FROM node:alpine
WORKDIR /whos-hodl-database
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

