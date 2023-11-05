import { Express } from 'express';
import authJwt from '@middleware/authJwt';
import controller from '@controllers/customer.controller';

export default function customerRoutes(app: Express) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    app.post('/api/customer', [authJwt.verifyToken], controller.create);

    app.get('/api/customer/:id', [authJwt.verifyToken], controller.getOne);

    app.patch('/api/customer/:id', [authJwt.verifyToken], controller.update);

    app.delete('/api/customer/:id', [authJwt.verifyToken], controller.remove);

    app.post('/api/customer/list', [authJwt.verifyToken], controller.getAll);
}
