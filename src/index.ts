import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import router from './routes';
import sequelize from './db/config';

const app = express().disable('x-powered-by');
app.use(cors());
app.use(helmet());
app.use(compression({threshold: 0}));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: true, limit: '100mb'}));

app.use('/api/v1', router);

// Check database connection
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`${process.env.APP_NAME} running on port ${port}`);
