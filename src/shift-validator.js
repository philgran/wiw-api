import _ from 'lodash';
import moment from 'moment';

const shiftValidator = (currentShifts, newShift) => {
  // Sort current shifts
  const sortedShifts = _.sortBy(currentShifts, (shift) => {
    return shift.startTime;
  });
  console.log(sortedShifts);
  // Check if shifts are sequential
}

export default shiftValidator;
