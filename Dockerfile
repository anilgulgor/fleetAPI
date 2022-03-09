FROM node:14.15.3-alpine
RUN apk add --no-cache bash
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "exec:build"]