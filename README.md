# ExhibitionCurator

This React application allows users to view, search, and filter through artworks available at The Metropolitan Museum of Art and the Chicago Art Institute.

The project simulates the experience of being a curator, offering a platform to appreciate and organize works of art into personalized collections that can be explored in detail.

## Features

- **Search and Filter Artworks:** Users can search for artworks using key terms and filter the results to find pieces that interest them.
- **View Artwork Details:** Click on any artwork in the list to see more information about it, including where it is on display and an external link to the museum's official page for more details.
- **Create a Personalized Collection:** Add or remove artworks from your own curated collection. This curated collection will persist as long as the browser is open, allowing users to continue exploring their chosen pieces.

## Deployed Site

Access the deployed version of the application here: https://art-exhibition-curator.netlify.app/

## APIs

The Metropolitan Museum of Art Collection API: https://metmuseum.github.io/

Art Institute of Chicago API: https://api.artic.edu/docs/

Both APIs are free to use and do not require API keys.

## Running Project Locally

In order to run this repository locally, follow these steps:

1. Clone the repo from GitHub to your local machine:

```
$ git clone https://github.com/grace-hartley/exhibition-curator.git
```

2. Install packages & dependencies

This project uses Node v20.17.0. Check your version of Node by running `node --version`.

```
$ npm install
```

3. Run the project

```
$ npm run dev
```

## Screenshots

<img src="screenshots\Home.png" height="400">
<img src="screenshots\Search.png" height="400">
<img src="screenshots\CuratedCollection.png" height="400">
