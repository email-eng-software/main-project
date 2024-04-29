import { Router } from 'express';
import SessionRoutes from './SessionRoutes.js';
import UserRoutes from './UserRoutes.js';
import MessageRoutes from './MessageRoutes.js';

const routes = Router();

routes
  .use('/', SessionRoutes)
  .use('/users', UserRoutes)
  .use('/messages', MessageRoutes);

export default routes;
