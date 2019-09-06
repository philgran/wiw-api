import { Router } from 'express';
import _ from 'lodash';
import shiftValidator from '../shift-validator';

const router = Router();

router.get('/', async (req, res) => {
  const shifts = await req.context.models.Shift.findAll({
    order: [['startTime', 'ASC']]
  });
  // If start and end are in params, filter by date range
  const q = req.query
  if (!_.isEmpty(q) && q.start && q.end) {
    // Create the filtered array of shifts
    const filteredShifts = shifts.filter((model) => {
      // Convert all dates to unix epoch for easier maths
      const startTimeInMs = +new Date(model.startTime);
      const endTimeInMs = +new Date(model.endTime);
      const startQueryInMs = +new Date(q.start);
      const endQueryInMs = +new Date(q.end)
      return startTimeInMs > startQueryInMs && endTimeInMs < endQueryInMs;
    });
    return res.send(filteredShifts);
  }
  return res.send(shifts);
});

router.get('/:shiftId', async (req, res) => {
  const shift = await req.context.models.Shift.findByPk(
    req.params.shiftId
  );
  return res.send(shift);
});

router.post('/', async (req, res) => {
  // TODO: validate that date ranges do not overlap
  // const currentShifts = await req.context.me.getShifts();
  // const newShift = {
  //   startTime: req.body.startTime,
  //   endTime: req.body.endTime
  // }
  // if (shiftValidator(currentShifts, newShift)) {
  const shift = await req.context.models.Shift.create({
    userId: req.context.me.id,
    position: req.body.position,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  return res.send(shift);
  // }
  // return res.send('Date range invalid');
});

router.put('/:shiftId', async (req, res) => {
  const shift = await req.context.models.Shift.findByPk(
    req.params.shiftId
  );
  if (shift) {
    shift.update(req.body);
  } else {
    return res.send(`Could not find shift with id ${shiftId}`);
  }
  return res.send(shift);
});

router.delete('/:shiftId', async (req, res) => {
  const result = await req.context.models.Shift.destroy({
    where: { id: req.params.shiftId }
  });
  // Result will be the number of deleted rows, if it's more than zero destroy worked.
  return res.send(result > 0);
});

export default router;
