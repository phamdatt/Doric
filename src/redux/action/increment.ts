export const increment = (hobby: any) => {
  return {
    type: 'increment',
    payload: hobby,
  };
};
