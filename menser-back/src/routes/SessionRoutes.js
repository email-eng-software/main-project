import { Router } from 'express';

import * as SessionsController from '../controllers/SessionController.js';

const SessionRoutes = Router();

SessionRoutes.post('/login', SessionsController.handleLogin);
SessionRoutes.post('/logout', SessionsController.handleLogout);
SessionRoutes.get('/refresh', SessionsController.handleRefreshToken);

export default SessionRoutes;
