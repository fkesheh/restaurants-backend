import Validators from "../../helpers/validators";
import { RestaurantsList } from "../data/restaurants-list";
import { CuisinesList } from "../data/cuisines-list";
import { Restaurant } from "../../models/restaurant";
import { SearchInterface } from "./search";


// Validates the input data if posted and not null and not zero
// If invalid throws an error
export function parseSearchParameters(body: any): SearchInterface {

    const searchTerms: SearchInterface = {};

    // Validate Rating - is numeric and betweem 1 and 5
    if (body.rating) {
        Validators.inRange('Customer Rating', body.rating, 1, 5);
        searchTerms.rating = Number(body.rating);
    }

    // Validate Distance - is numeric and betweem 1 and 10
    if (body.distance) {
        Validators.inRange('Distance', body.distance, 1, 10);
        searchTerms.distance = Number(body.distance);
    }

    // Validate Price - is numeric and betweem 10 and 50
    if (body.price) {
        Validators.inRange('Price', body.price, 10, 50);
        searchTerms.price = Number(body.price);
    }

    // No validation for name required
    if (body.name) {
        searchTerms.name = `${body.name}`.trim().toLowerCase();
    }

    // No validation for cuisine required
    if (body.cuisine) {
        searchTerms.cuisine = `${body.cuisine}`.trim().toLowerCase();
    }

    return searchTerms;
}


// Search engine logic
export function searchEngine(rawBody: any): Restaurant[] {

    // Get restaurants array
    let restaurants = Object.values(RestaurantsList) as Restaurant[];


    // -------------------- Parse and Validation ----------------------------

    const terms = parseSearchParameters(rawBody);


    // ---------------------------- Filters ----------------------------------

    // Filter by rating
    if (terms.rating) {
        restaurants = restaurants.filter(r => r.customerRating >= terms.rating!);
    }

    // Filter by distance
    if (terms.distance) {
        restaurants = restaurants.filter(r => r.distance <= terms.distance!);
    }

    // Filter by price
    if (terms.price) {
        restaurants = restaurants.filter(r => r.price <= terms.price!);
    }

    // Filter by name
    if (terms.name) {
        restaurants = restaurants.filter(r => r.searchTerm.includes(terms.name!));
    }

    // Filter by cuisine
    if (terms.cuisine) {

        // Find witch cuisines matches with the search string and stores it on cuisinesFilter
        const cuisinesFilter: number[] = [];
        for (const cuisineId in CuisinesList) {
            if (CuisinesList[cuisineId].searchTerm.includes(terms.cuisine)) {
                cuisinesFilter.push(Number(cuisineId));
            }
        }

        // Filter restaurants that have cuisines in cuisinesFilter
        restaurants = restaurants.filter(r => cuisinesFilter.indexOf(r.cuisineId) !== -1);
    }


    // ---------------------------- Ranking Results ----------------------------

    restaurants.sort((a, b) => {

        // First Rule, sort by the shortest distante
        if (a.distance > b.distance) {
            return 1;
        }
        if (a.distance < b.distance) {
            return -1;
        }

        // Second Rule, If distance is a tie sort by greatest customer rating
        if (a.customerRating < b.customerRating) {
            return 1;
        }
        if (a.customerRating > b.customerRating) {
            return -1;
        }

        // Third Rule, If customer rating is a tie sort by lowest price
        if (a.price > b.price) {
            return 1;
        }
        if (a.price < b.price) {
            return -1;
        }

        // Fourth Rule, if still a tie randomly choose one
        if (Math.random() >= 0.5) {
            return 1;
        }
        return -1;

    });

    // ---------------------------- Limiting Results ----------------------------

    return restaurants.slice(0, 5);

}

export default { parseSearchParameters, searchEngine };
