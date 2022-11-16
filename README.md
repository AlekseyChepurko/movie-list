https://user-images.githubusercontent.com/7461857/202179689-02de3040-83d5-4468-b3f1-313306cb7062.mp4

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Preparation

### !!!ATTENTION!!!

Application uses 3rd-party APIs:
- [TMDB](https://www.themoviedb.org/documentation/api) 
- [YouTube Data API](https://developers.google.com/youtube/v3/getting-started)

So before start you need to get appropriate API keys and place them to the [.env.json](./.env.json) file

## Available Scripts

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\

### `npm run serve`
Build the project's artifacts and starts delivering at the localhost

## Development approaches

### Data handling ways

To handle data values and store them in a safe way we use:
- [fp-ts](https://github.com/gcanti/fp-ts) to store and handle application-level data
- [io-ts](https://github.com/gcanti/io-ts) to validate 3rd-party services' response in a runtime

To handle async-stuff [rxjs](https://rxjs.dev/) was chosen.
In combination with fp-ts based helper called [RemoteData](https://github.com/devexperts/remote-data-ts)
it allows us to create the separate monad-based helper called [LiveData](./src/utils/liveData).
In general all LiveData stuff is just ```Observable<RemoteData>``` wrapped in a monad-way


### Code splitting

UI file structure is organized with an approach based on [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/).

All UI components (atoms/molecules/organisms) should be placed at [src/ui](./src/ui).
Everything inside of `src/ui` should not know about business logic at all!

All business logic should be placed at [src/features](./src/features) dir.

Services logic should be placed at

    src/services/serviceName.service.ts

All network-level codecs should be placed at the

    src/codecs/codecName.codec.ts

All application level common type-models should be placed to the [src/domain](./src/domain) dir

### Routing structure

All available application's routes should be stored in a single place: 
[src/routes](./src/routes) and have to match common pattern:
```typescript jsx
const routes = {
    pathName: {
        path: '/data/:dataID', // pattern for react-router to match
        getPath: (dataID: string) => `/data/${dataID}` // path constructor 
    }
}
```
