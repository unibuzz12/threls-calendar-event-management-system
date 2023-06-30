# Calendar Event Management System

This project is a monorepo and uses lerna as it management tool, visit [lerna](https://lerna.js.org/docs) for more info.

## Available Scripts

In the project directory, you can run the following commands from the root directory:

### `yarn start`

Runs the client and server in the development mode.\
For the Client Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
For the Server Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in terminal.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `yarn lint`

Launches Eslint and show programmatic problems in console and vscode

## Additinoal Comments for Project
### `Front-end missing points`
- TDD using Jest
- SSR based on Next API
- Calendar Event Notification
- Implemenation of Daily or Weekly basis calendar(Now only for Monthly basis)
- Snackbar Alert for CURD actions
- Pixel Perfect and Responsive design(Currently it's only for Desktop resolution)

### `Back-end missing points`
- TDD using Jest(Unit and E2E testing)
- Implementation of User Module(Current design not includes the user and attenders who is scheduled the event and will attend)

### `Deployment`
- Will be best to deploy in Kubernate because it's modulized by lerna