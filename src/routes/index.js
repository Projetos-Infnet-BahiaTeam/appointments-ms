import { Router } from 'express';

import appointmentsRouter from './appointmentsRouter';

const routes = Router();

routes.use('/api/appointments', appointmentsRouter);

export default routes;