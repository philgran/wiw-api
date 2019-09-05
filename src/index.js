import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();
const eraseDatabaseOnSync = true;
const createUsersWithShifts = async () => {
  await models.User.create(
    {
      userName: 'philgran',
      fullName: 'Phil Gran',
      phoneNumber: '9177910056',
      shifts: [
        {
          position: 'bartender',
          startTime: '2019-09-06T17:00:00+0000',
          endTime: '2019-09-06T22:00:00+0000',
        },{
          position: 'dj',
          startTime: '2019-10-01T13:00:00+0000',
          endTime: '2019-10-03T19:00:00+0000',
        }, {
          position: 'server',
          startTime: '2019-09-07T13:00:00+0000',
          endTime: '2019-09-07T19:00:00+0000',
        }
      ]
    }, {
      include: [models.Shift],
    },
  );
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByUserName('philgran'),
  };
  next();
});
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/shifts', routes.shift);

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithShifts();
  }

  app.listen(3000, () =>
    console.log('Listening on 3000')
  );
});
