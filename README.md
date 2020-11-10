# Pizza Rating

## A simple project for ranking pizzas.

This project has been bootstrapped with [Next.js](https://nextjs.org/learn).

## Requirements.

NodeJS 12.x previously installed.

## Running test server data

This project use **json-server** in order to mock data to feed the application. Before running the web app, you need to execute the follow command.

```sh
npm install
npm run server-data
```

## How to run in local.

```sh
npm run dev
```

And enter the follow url: http://localhost:300

### Build and run in production mode.

Since we're using Next.js, we can take advantage of the Server Side Rendering (SSR) feature which improves dramatically the performance building the essential javascript on client side.
You can run the follow commands to enter into production mode:

```sh
npm run build
npm run start
```

And enter the follow url: http://localhost:300

### Test.

```sh
npm run test:coverage
```

### Debug.

You can enter in debug mode by running just the follow command. To learn more about debug in Next.js click [here](https://nextjs.org/docs/advanced-features/debugging)

```sh
npm run debug
```
