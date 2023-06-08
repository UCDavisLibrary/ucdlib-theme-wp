ARG NODE_VERSION=18
FROM node:${NODE_VERSION}

ARG THEME_TAG

WORKDIR /theme

# Get fresh copy of theme
RUN git clone https://github.com/UCDavisLibrary/ucdlib-theme-wp.git
WORKDIR /theme/ucdlib-theme-wp
RUN git checkout ${THEME_TAG}
RUN git pull

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

COPY container-scripts scripts

ENTRYPOINT [ "bash", "-c" ]
CMD ["echo 'Use command arg to specify a script to run.'"]
