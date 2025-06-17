import { Container } from 'inversify';
import { TYPES } from './types';
import { DashboardService } from './services/dashboard.service';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardRouter } from './routes/dashboard.routes';

const container: Container = new Container();

container.bind(TYPES.DashboardService).to(DashboardService);
container.bind(TYPES.DashboardController).to(DashboardController);
container.bind(TYPES.DashboardRouter).to(DashboardRouter);

export { container };
