const GET_NOTIFICATIONS = "notifications/GET_NOTIFICATIONS";
const NEW_NOTIFICATION = "notifications/NEW_NOTIFICATION";
const getNotifications = (notifications) => {
  return {
    type: GET_NOTIFICATIONS,
    notifications,
  };
};

const newNotification = (notification) => {
  return {
    type: NEW_NOTIFICATION,
    notification,
  };
};

export const fetchNewMessages = () => async (dispatch) => {
  const res = await fetch("/api/dms/new");

  if (res.ok) {
    const newMessages = await res.json();
    console.log(newMessages);

    const notifications = {};

    newMessages.forEach((message) => {
      notifications[message.sender.id] = {
        sender_id: message.sender.id,
        conversation_id: message.conversation_id,
        read: message.read,
      };
    });

    dispatch(getNotifications(notifications));
  }
};

export const addNotification = (notification) => async (dispatch) => {
  const { recipient_id, sender_id, conversation_id } = notification;
  console.log("this is the thunk notification");
  console.log(notification);
  dispatch(
    newNotification({
      recipient_id: recipient_id,
      sender_id: sender_id,
      conversation_id: conversation_id,
    })
  );
};
const initalState = {};

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.notifications;

    case NEW_NOTIFICATION:
      const newState = {
        ...state,
        [action.notification.sender_id]: action.notification,
      };
      return newState;
    default:
      return state;
  }
}
