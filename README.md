![Image of Rocket](https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/24/42598-rocket-icon.png)  ## About the project

Team Space Project is a project design as company intranet page. Here you can see the News Feed, places for lunch and reserve a device for testig, a book or a meeting room.

## Run the project

- To run this project you will need [Node](https://nodejs.org/en/). We strongly recommend to use [nvm](https://github.com/nvm-sh/nvm) for installing node.
- After installing nvm go to project directory and run:
  - `nvm install [version in .nvmrc file]`
  - `nvm use`
  - `npm install`
  - `npm run start-server` - runs server
  - `npm start` - builds project for development

## Available Scripts

In the project directory, you can run:

### `npm run start-server`

Runs JSON server. Edit `db.json` to update data.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### .env

The page uses some environment variables. You will need to create a file .env and insert these variables:
To access the hosted database use this:
REACT_APP_DATABASE_URL = "https://sfe2020-status202.azurewebsites.net"
Also, it could be runned in the local host if the database is out of reach:
REACT_APP_DATABASE_URL = "http://localhost:3008"
To reach the interactive google maps, you will need to insert google maps api key:
REACT_APP_GOOGLE_MAPS_API_KEY=

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs all linters and prettier and shows any warnings/errors in console.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
