import { INCREASE, DECREASE } from '../constants';

const initialState = {
  number: 1
};

export function counter(state = initialState, action) {
  if (action.type === INCREASE) {
    return { number: state.number + action.amount };
  } else if (action.type === DECREASE) {
    return { number: state.number - action.amount };
  }

  return state;
}
