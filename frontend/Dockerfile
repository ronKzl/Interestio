# build the react app
# FROM node:22-alpine3.22 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # serve the app with Nginx
# FROM nginx:stable
# RUN rm -rf /user/share/nginx/html/*
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 5173
# CMD ["nginx","-g","daemon off;"]

FROM node:22-alpine3.22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]