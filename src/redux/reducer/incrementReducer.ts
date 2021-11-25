import { increment } from '../action/increment';
const initState = {
  list: [],
};
const incrementReducer = (state = initState, action: any) => {
  switch (action.type) {
    case 'increment': {
      const newList = [...state.list];
      // newList.push(action.payload);
      return {
        ...state,
        list: newList,
      };
      break;
    }
    default:
      return state;
  }
};
export default incrementReducer;
