import { Request } from 'express';
import { Restaurant } from '../../models/restaurant';
import { searchEngine } from '../search/search-engine';


// --------------------- Restaurant API Services ---------------------------

// ---------------------------- Search Endpoint -----------------------------
// Method: POST
// BODY:   Json Object containing search terms, check ./models/search.ts for details
export const search = async (req: Request): Promise<Restaurant[]> => searchEngine(req.body);


export default { search };
