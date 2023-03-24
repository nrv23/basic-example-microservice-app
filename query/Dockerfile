FROM node:16-alpine

WORKDIR /app
COPY package.json /app
RUN npm install 
COPY ./ /app
# EXPOSE documenta cual puerto se expone pero en la imagen de docker no lo hace.
EXPOSE 9002  

CMD ["npm","start"]