import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  Shift: sequelize.import('./shift'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;

// let users = {
//   1: {
//     id: 1,
//     fullName: 'Phil Gran',
//     userName: 'philgran',
//     phoneNumber: '9177910056'
//   }
// }
//
// let shifts = {
//   1: {
//     userId: 1,
//     position: 'bartender',
//     startTime: '2019-09-03T17:00:00+0000',
//     endTime: '2019-09-03T22:00:00+0000'
//   }
// }
//
// export default {
//   users,
//   shifts,
// };
