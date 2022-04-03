export const OPEN_TASK = "OPEN_TASK";
export const CLOSE_TASK = "CLOSE_TASK";
export const TASK_MESSENGER_ONLY = "TASK_MESSENGER_ONLY";
export const CLEAR_MESSANGER = "CLEAR_MESSANGER";

export const timeoutShowTask = (task) => (dispatch) => {
  dispatch({
    type: OPEN_TASK,
    isModalOpen: true,
    task,
  });
  setTimeout(
    () =>
      dispatch({
        type: CLOSE_TASK,
        isModalOpen: false,
      }),
    3000
  );
};
export const taskMessengerOnly = (task) => (dispatch) => {
  dispatch({
    type: TASK_MESSENGER_ONLY,
    isModalOpen: false,
    task,
  });
  setTimeout(
    () =>
      dispatch({
        type: CLEAR_MESSANGER,
        isModalOpen: false,
      }),
    3500
  );
};
