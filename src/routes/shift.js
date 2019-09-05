import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const shifts = await req.context.models.Shift.findAll({
    order: [['startTime', 'ASC']]
  });
  return res.send(shifts);
});

router.get('/:shiftId', async (req, res) => {
  const shift = await req.context.models.Shift.findByPk(
    req.params.shiftId
  );
  return res.send(shift);
});

router.post('/', async (req, res) => {
  const shift = await req.context.models.Shift.create({
    userId: req.context.me.id,
    position: req.body.position,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  return res.send(shift);
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
  return res.send(result);
});

export default router;
