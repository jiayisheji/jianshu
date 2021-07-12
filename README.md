# Jianshu

A simple application demonstrating [Angular](https://github.com/angular/angular) (SPA, SSR) the basic usage of permissions with [NestJS](https://github.com/nestjs/nest) (JWT, Passport, Github, User, Group, Permission) based on [jianshu](https://www.jianshu.com) template.

## Related Technology

- [@nrwl/nx](https://github.com/nrwl/nx) - Nx is an open platform with plugins for many modern tools and frameworks.
- [NestJS](https://github.com/nestjs/nest) - a JS backend framework providing architecture out of the box with a syntax similar to Angular
- [Angular](https://github.com/angular/angular) - a JS frontend framework created by Google
- [Angular Universal](https://github.com/angular/universal) - a JS frontend framework created by Google
- [Material-ui](https://material.angular.io/) - Material Design components for Angular
- [TypeScript](https://github.com/Microsoft/TypeScript) - reactive extensions for JavaScript
- [RxJS](https://github.com/Reactive-Extensions/RxJS) - superset of JS which compiles to JS, providing compile-time type checking
- [MongoDB](https://github.com/mongodb/mongo) - a NoSQL database
- [Mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling designed to work in an asynchronous environment
- [TypeORM](https://github.com/typeorm/typeorm) - ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.
- [Redis](https://redis.io) - Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.
- [Ioredis](https://github.com/luin/ioredis) - A robust, performance-focused and full-featured Redis client for Node.js.
- [Passport](https://github.com/jaredhanson/passport) - a popular library used to implement JavaScript authentication
- [JWT](https://jwt.io) - JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties.
- [Docker](https://www.docker.com) - Complete flexibility to run any Docker commands. Ship Better Code, Faster.

## Features

- Use the Mongoose(Typegoose) connect MongoDB
- Use the Ioredis connect Redis
- Use JWT for authentication
- Support github authentication login
- Super easy to install and start using the full-featured controllers and services
- DB and service agnostic extendable CRUD controllers
- Reach query parsing with filtering, pagination, sorting, relations, nested relations, cache, etc.
- Framework agnostic package with query builder for a frontend usage
- Query, path params and DTO validation included
- Overriding controller methods with ease
- Tiny config (including globally)
- Additional helper decorators
- Swagger documentation
- Support Angular server rendering
- Support Angular responsive presentation
- Support Domain-Driven Design

## Running the project

These instructions should be sufficient for one to get the project going on their local machine

### Installing core dependencies

- make sure you have [node.js](https://nodejs.org/en/download/) installed version 12.13+

#### Local Installing DB dependencies

- make sure you have [MongoDB](https://www.mongodb.com/) installed version 3.4+
- make sure you have [Redis](https://redis.io/download) installed version 3.2+

#### Docker Installing DB dependencies

- make sure you have [Docker](https://www.docker.com/products/docker-desktop)

### Cloning the github repository

To clone the project, run

```bash
git clone https://github.com/jiayisheji/jianshu.git
```

### Installing the dependencies

To install the dependencies after you've cloned the project, go to its root folder and run

```bash
cd jianshu && npm install
```

### Setting environment variables

```bash
cp .env.example  .env
```

> Modify the corresponding values as required

### Starting the MongoDB and Redis

Once you start the database application, you are ready to run the server

Boot according to your system

Notice that the server uses MongoDB and Redis so we need to have a MongoDB and Redis instance running so the server can connect to it。

If you use Docker:

```bash
docker-compose up -d
```

### Alternative commands

If you need to work on the frontend and backend parts at the same time, you can run

```bash
npm start
```

Then, you can go to the Angular dev server at port 4200 and test server requests (to port 3000), we got a proxy to the backend

If you only need to work on the frontend, you can run

```bash
npm run start client
```

Alternatively, if you only need to work on the backend, you can run

```bash
npm run start server
```

Keeping in mind that you need to have the Angular app built and a MongoDB and Redis connection established

## Documentation

- [Angular Docs](https://angular.io/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Typescript Docs](http://www.typescriptlang.org/)
- [Rxjs Docs](https://rxjs.dev/api)
- [Mongoose Docs](https://mongoosejs.com/)
- [Typegoose Docs](https://typegoose.github.io/typegoose/)
- [Ioredis Docs](https://github.com/luin/ioredis/blob/master/API.md)
- [Graphql Docs](https://graphql.org/)
- [Passport Docs](http://www.passportjs.org/)
- [JWT Docs](https://jwt.io/)
- [Tutorial Docs](docs/README.md)

## Support

Any support is welcome. At least you can give us a star :star:

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) <br /> Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) <br /> Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) <br /> IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) <br /> Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) <br /> Opera |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| last 2 versions                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                                      | IE11, Edge                                                                                                                                                                                                         | last 2 versions                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                              |

## License

[MIT](LICENSE)

