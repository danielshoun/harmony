const GET_NOTIFICATIONS = 'notifications/GET_NOTIFICATIONS'

const getNotifications = (notifications) => {
    return {
        type: GET_NOTIFICATIONS,
        notifications
    }
}


export const fetchNewMessages = () => async (dispatch) => {
    const res = await fetch('/api/dms/new')

    if(res.ok) {
        const newMessages = await res.json()
        console.log(newMessages)

        const notifications = {};

        newMessages.forEach(message => {
            notifications[message.id] = {
                sender_id: message.sender.id,
                conversation_id: message.conversation_id,
                read: message.read
            }
        })

        dispatch(getNotifications(notifications))
    }
}

const initalState = {}

export default function reducer(state = initalState, action){
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return action.notifications
    
        default:
            return state;
    }
}