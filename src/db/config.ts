import {Sequelize} from 'sequelize';

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     pool: {max: 5},
//     logging: `${process.env.ENV}` === 'production' ? false : console.log,
//     dialect: 'mysql',
//     dialectOptions: {
//       timezone: '+07:00',
//       connectTimeout: 10000,
//     },
//   },
// );

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    pool: { max: 5 },
    logging: `${process.env.ENV}` === 'production' ? false : console.log,
    dialect: 'postgres',
    dialectOptions: { application_name: process.env.APP_NAME },
    timezone: '+07:00',
  },
);


export default sequelize;
