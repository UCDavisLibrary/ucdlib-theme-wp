ARG NODE_VERSION=20
FROM node:${NODE_VERSION}

ARG THEME_TAG
ENV THEME_TAG=${THEME_TAG}

WORKDIR /theme

# Get fresh copy of theme
RUN git clone https://github.com/UCDavisLibrary/ucdlib-theme-wp.git
WORKDIR /theme/ucdlib-theme-wp
RUN git checkout ${THEME_TAG}

# Install dependencies
RUN cd src/public && npm install
RUN cd src/editor && npm install

# Build assets
RUN cd src/public && npm run dist
RUN cd src/editor && npm run dist

# remove node_modules
RUN cd src/public && rm -rf node_modules
RUN cd src/editor && rm -rf node_modules

WORKDIR /theme

# install php and composer dependencies
RUN apt-get update && apt-get install -y \
    php \
    php-curl \
    && rm -rf /var/lib/apt/lists/*
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ENV COMPOSER_ALLOW_SUPERUSER=1;
COPY composer.json .
RUN composer config --no-plugins allow-plugins.composer/installers true
RUN composer install

COPY container-scripts scripts

ENTRYPOINT [ "bash", "-c" ]
CMD ["echo 'Use command arg to specify a script to run.'"]
