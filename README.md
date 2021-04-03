# Satellite - NASA API

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Live demo: dreamy-lalande-9cfe32.netlify.app/

## Installation & Running project locally

1. Clone the repo
2. Run `yarn` command
3. Add environment variables in `.env.development.local` file based on `.env.example`
4. Run `yarn start` command
5. Go to http://localhost:3000

## Project description

This app is created to browse the NASA satellite images from any location you want.
After selecting an interesting location the image from the satellite and map of this location will appear.

## Components

### Map

The map component creates a `leaflet` map.
It uses a global `L` variable provided by the script loaded in `index.html`.
The map is listening to coordinates changes and update its own view according to new data.

### SatelliteImage

Satellite image displays fetched image from NASA API.
`REACT_APP_NASA_API_KEY` is required to make a proper request.
It fetches a new image every time when `location` prop will be changed.
The component handles loading state and display `CircularProgress` when the image is fetching.

### Search

The search component uses the `Autocomplete` component from Material UI.
When a user finished typing, the debounced `fetchData` function fires after 200ms.
This function fetches data from `OpenStreetMap` to display a list of locations based on the user query.
After adding the new results to the list of options the component passes the selected location up to the `App` component.

## Libraries used in this project

- `React`
- `Material UI`
- `lodash.debounce`
- `PropTypes`
- `node-sass`
- `eslint`
- `stylelint`
