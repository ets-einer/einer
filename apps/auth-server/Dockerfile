# Dockerfile
FROM node:16-alpine

# Create app directory
# WORKDIR /usr/src/app
WORKDIR /app

COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npx prisma db push
RUN npx prisma generate

EXPOSE 4001
CMD [ "npm", "start" ]