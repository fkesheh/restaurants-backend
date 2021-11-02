
import express, { Router } from 'express';
import { logAPICall, logError } from './loggers';

export type method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export interface IRoute { method: method, path: string, handler: Function };


// Simple routing middleware

export function RouterMiddleware(routes: IRoute[]): Router {

    const router = express.Router();

    routes.forEach(route => {

        router.use(route.path, async (req, res, next) => {
            if (req.method === route.method.toUpperCase()) {
                try {
                    // Process Route
                    logAPICall(route.method, route.path, JSON.stringify(req.body));
                    return res.status(200).json(await route.handler(req));
                } catch (e) {
                    // Log and return errors
                    logError(route.method, route.path, e);
                    res.status(500).send({ error: `${e}` });
                }
            } else {
                next();
            }
        });

    });

    return router;
}