import { startServer } from './utils';
import AppConfig from './config/AppConfig';

const config = new AppConfig();
startServer(config);