FROM wordpress

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN cd /var/www/html/wp-content/themes/demo-theme && composer install
