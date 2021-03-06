# Simon Says

Data visualization for the [Open Research Corpus](http://labs.semanticscholar.org/corpus/) dataset.

## Getting Started

We use [`yarn`](https://yarnpkg.com/en/) to manage our dependencies. To install
dependencies, run:

```
yarn
```

To start a development server, run:

```
yarn start
```

A local browser should start automatically.

## Development

This project was bootstrapped with
[`create-react-app`](https://github.com/facebookincubator/create-react-app) and
has not been ejected yet.

We make use of [React](https://reactjs.org/) to implement our UI components,
and [Redux](https://github.com/reactjs/redux) to manage state and data in this
application. Styling and theming are implemented in SCSS, and compiled with
`node-sass`.

The entire application is bundled with Webpack to be distributed as a
Single Page Application.

### `json-server` Development Stub Server

API requests are being made to an API stub server via `json-server`. The
responses are defined in `db.json` and `routes.json` respectively. Refer to the
`json-server` documentation for more details.

This removes the dependency on a backend application during prototyping
and development of the frontend application.

## Deployment

The application is currently deployed to
[Heroku](https://simon-says-frontend.herokuapp.com).
Due to the limited amount of money and resources that we poor students have,
we are only able to upload 80,000 of the dataset onto our backend Heroku
instance. Therefore the data is not as complete as the full dataset.
