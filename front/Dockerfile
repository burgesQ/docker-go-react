FROM node:10 as dev

# define work directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# set env var
ENV NODE_ENV=dev
ENV API_HOST=''

# install app dependencies
COPY package*.json ./
RUN npm install --silent && npm install react-scripts -g --silent

# add app
COPY . ./

CMD npm start

FROM node:10 as build

ENV NODE_ENV=production

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .

RUN npm run build -o app

# multistage build...
# this runs a lil nginx instance to serve the app
FROM nginx:alpine as prod

EXPOSE 3000
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
