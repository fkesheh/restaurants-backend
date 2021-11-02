import { IRoute, RouterMiddleware } from '../middleware/router';
import RestaurantsService from './services/restaurants-service';


// Declared Routes
const routes: IRoute[] =
[
  { method: 'post', path: '/search', handler: RestaurantsService.search }
];

export const restaurantsRouter = RouterMiddleware(routes);
