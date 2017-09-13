# Maven spring webpack scaffold

A scaffold with Maven, Spring and Webpack

> refer to [this repository](https://github.com/Febbweiss/springboot-react-webpack) for maven

This project includes:

* Spring as backend resources
* Webpack to translate ES2015 to JS and manage client resources link
* jQuery as default vendor for example
* Mocha, Chai, Sinon and Karma as client test environments

## Profile

There are 2 profiles:

* `development` used to build development client resource with `NODE_ENV=development`
* `production` used to build production client resource with `NODE_ENV=production`

## Launching

```sh
# watch
mvn frontend:install-node-and-npm@install-node-and-npm frontend:npm@npm-install frontend:npm@npm-watch

# server
mvn frontend:install-node-and-npm@install-node-and-npm frontend:npm@npm-install frontend:npm@npm-server

# build
mvn frontend:install-node-and-npm@install-node-and-npm frontend:npm@npm-install frontend:npm@npm-build

# production build
mvn frontend:install-node-and-npm@install-node-and-npm frontend:npm@npm-install frontend:npm@npm-prod-build -Pproduction

# test
mvn frontend:install-node-and-npm@install-node-and-npm frontend:npm@npm-install frontend:npm@npm-test
```

## Configuration

### Sprint and Maven

Spring and Maven configurations is done by the 'pom.xml' file at the project's root.

### Client global states

Client global states configuration is done by the 'global.config.js' file at the project's root.

### Webpack

Webpack configuration is done by the 'webpack.config.js' file at the project's root.

### Client test

Client test configurations is done by the 'karma.conf.js' file at the project's root.