# feathers-next

This project shows a way to integrate a [Next.js](https://github.com/zeit/next.js) application with a [Feathers](http://feathersjs.com) backend, including authentication (with user name/password) and Redux.

## About

Original project: https://github.com/leob/feathers-next

The project was inspired by [feathers-next-example](https://github.com/Albert-Gao/feathers-next-example)
and by [this](https://github.com/hugotox/next.js/tree/canary/examples/with-cookie-auth-redux) example for the authentication part.

Contrary to [feathers-next-example](https://github.com/Albert-Gao/feathers-next-example), the Feathers backend (API) is separated from the Next.js frontend (SSR UI). This means that we're running two separate server (node.js) processes.

It makes the app easier to develop, maintain, configure since we can use the
[Feathers Generator](https://www.npmjs.com/package/@feathersjs/cli)
(or [Feathers+ Generator](https://www.npmjs.com/package/@feathers-plus/generator-feathers-plus))
without mingling Feathers API backend code with Next.js server rendering code.

## Getting Started

The repository contains both the API backend and the UI frontend, in two separate directories `api` and `ui`.

To install the app (backend and frontend), issue the following commands:

```
# Install and run feathers:
cd api

npm install && npm run start
or
yarn install && yarn run start

# Then in another terminal, install and run next.js:
cd ui

npm install && npm run dev
or
yarn install && yarn run dev

# The command above ("npm run dev") supports hot reload, and is perfect for developing.
# For production however, be sure to do a "build" and "run" as follows:

npm run build && npm run start
or
yarn run build && yarn run start

# Click through the app both in 'development' and 'production' mode, and notice how the app is MUCH faster in production mode!
```
To view the app, open your browser and go to http://localhost:3000.
You should see the home page containing Login and Register links.

## Using the app

The home page of the app contains "Login" and "Register" links. Click on "Register", enter a user name and password of your choosing (choose anything you want, there are no restrictions) and click "Submit". You are now registered, and logged in.

Click on the other links (```private``` and ```private-perm-required```) to see if they work. The ```private``` page demonstrates how to call a Feathers service which requires authentication (in the Feathers backend we've implemented a simple "counters" service which always returns the same set of data).

To access the ```private-perm-required``` page, you need an "admin" user. Click ```Logout``` on the home page and then click ```Register```, and register a new user with the user name "admin". You should now be able to access the ```private-perm-required``` page.
