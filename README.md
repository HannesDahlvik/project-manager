# Project Manager

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

-   `server`: a [Express](https://expressjs.com/) with [TRPc](https://trpc.io/) server
-   `web`: a [React](https://reactjs.org/) app made with [Parcel](https://parceljs.org/)
-   `config`: `eslint` configurations (`eslint-config-prettier`)
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```
