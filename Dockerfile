FROM wordpress

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR "/var/www/html/wp-content/themes/demo-theme"
RUN composer install
RUN cd /src && npm install
