const GET_NOTIFICATIONS = "notifications/GET_NOTIFICATIONS";
const NEW_NOTIFICATION = "notifications/NEW_NOTIFICATION";
const REMOVE_NOTIFICATION = "notifications/REMOVE_NOTIFICATION";


const getNotifications = (notifications) => {
  return {
    type: GET_NOTIFICATIONS,
    notifications,
  };
};

const removeNotification = (id) => {
    return{
        type: REMOVE_NOTIFICATION,
        id
    }
}

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
  dispatch(
    newNotification({
      recipient_id: recipient_id,
      sender_id: sender_id,
      conversation_id: conversation_id,
    })
  );
};

export const deleteNotification = (id) => async (dispatch) => {
    dispatch(removeNotification(id))
}


const initalState = {};

export default function reducer(state = initalState, action) {
  let newState = {}
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.notifications;

    case NEW_NOTIFICATION:
      newState = {
        ...state,
        [action.notification.sender_id]: action.notification,
      };
      return newState;
    case REMOVE_NOTIFICATION:
        newState = {...state}
        delete newState[action.id]
        return newState
    default:
      return state;
  }
}
