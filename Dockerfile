FROM node:14-alpine as build
COPY package.json .
COPY angular.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .
COPY tslint.json .
COPY src src
RUN npm install
RUN ["npm", "run", "build-prod"]

FROM httpd:2.4.37
EXPOSE 80
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build dist/capitalize-front .
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
RUN touch ./.htaccess
RUN echo "<IfModule mod_rewrite.c>\n \
    RewriteEngine on\n \
    RewriteCond %{REQUEST_FILENAME} -s [OR]\n \
    RewriteCond %{REQUEST_FILENAME} -l [OR]\n \
    RewriteCond %{REQUEST_FILENAME} -d\n \
    RewriteRule ^.*$ - [NC,L]\n \
    RewriteRule ^(.*) index.html [NC,L]\n \
    </IfModule>" > ./.htaccess
