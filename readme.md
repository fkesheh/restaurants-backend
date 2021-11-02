# Restaurants Backend

This is a basic server that implements the search engine for the restaurants-app using express and typescript 

## Source Code:

* src/helper -> Helper Files
    * validators.ts - Implements the validation logic
* src/middleware -> Middlewares
    * logger.ts - Implements the logger functions
    * router.ts - Implements a router middleware to make the specific routers cleanner
* src/models -> Models
    * cuisine.ts - Interface for Cuisine
    * cuisines.ts - Interface for Cuisines List
    * restaurant.ts - Interface for Restaurant
    * restaurants.ts - Interface for Restaurants List
* src/restaurants -> Specific restaurant router, services, logic and data
    * restaurants-router.ts -> create api endpoints
    * src/restaurants/data -> Data of restaurants and cuisines
        * cuisines-list.ts -> Cuisine List
        * restaurants-lists.ts -> Resta
    * src/restaurants/search -> Search Engine Implementation
        * search-engine.ts -> search logic
    * src/restaurants/services -> Services to process restaurant requests
        * restaurant-service.ts -> process restaurant requests

## Running instructions

To run this project, you need to have node and npm package manager installed. More information at -> https://nodejs.org/en/download/
First install the npm packages

`npm install`

Then to get the server running on dev mode

`npm run dev`

Or you can also build the project and then run it with node.js

`npm run build`

`node ./build/server.js`