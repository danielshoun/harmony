import {on} from "socket.io-client/build/on";

const createSocketUseEffect = (
    type,
    socket,
    setMessages,
    messages,
    channel = null,
    conversationId = null,
    recipientId = null,
    server = null,
    setOnlineMembers = null,
    setOfflineMembers = null
) => {
    return () => {
        function socketOnChat(chat) {
            setMessages((messages) => [...messages, chat]);
        }

        function socketOnEdit(newMessage) {
            const messageIdx = messages.findIndex(message => message.id === newMessage.id);
            setMessages(messages => [...messages.slice(0, messageIdx), newMessage, ...messages.slice(messageIdx + 1, messages.length)]);
        }

        function socketOnDelete({messageId}) {
            const messageIdx = messages.findIndex(message => message.id === messageId);
            setMessages(messages => [...messages.slice(0, messageIdx), ...messages.slice(messageIdx + 1, messages.length)]);
        }

        let socketOnUserList;
        let socketOnUserOnline;
        let socketOnUserOffline;

        if (server) {
            socketOnUserList = (data) => {
                const {onlineUserIds, offlineUserIds} = JSON.parse(data);
                const onlineUsers = [];
                const offlineUsers = [];
                onlineUserIds.forEach(id => {
                    const user = server.members.find(user => user.id === id);
                    if (user) onlineUsers.push(user);
                });
                offlineUserIds.forEach(id => {
                    const user = server.members.find(user => user.id === id);
                    if (user) offlineUsers.push(user);
                });
                setOnlineMembers(onlineUsers);
                setOfflineMembers(offlineUsers);
            };

            socketOnUserOnline = ({userId}) => {
                let userInOfflineList;
                setOfflineMembers(offlineMembers => {
                    let indexInOfflineList = offlineMembers.findIndex(member => member.id === userId)
                    userInOfflineList = offlineMembers[indexInOfflineList]
                    return [...offlineMembers.slice(0, indexInOfflineList), ...offlineMembers.slice(indexInOfflineList + 1, offlineMembers.length)]
                })
                setOnlineMembers(onlineMembers => {
                    let indexToInsert = onlineMembers.findIndex(member => member.id > userId) - 1
                    if(indexToInsert === -1) indexToInsert = 0
                    return [...onlineMembers.slice(0, indexToInsert), userInOfflineList, ...onlineMembers.slice(indexToInsert, onlineMembers.length)]
                })
            };

            socketOnUserOffline = ({userId}) => {
                let userInOnlineList;
                setOnlineMembers(onlineMembers => {
                    let indexInOnlineList = onlineMembers.findIndex(member => member.id === userId)
                    userInOnlineList = onlineMembers[indexInOnlineList]
                    return [...onlineMembers.slice(0, indexInOnlineList), ...onlineMembers.slice(indexInOnlineList + 1, onlineMembers.length)]
                })
                setOfflineMembers(offlineMembers => {
                    let indexToInsert = offlineMembers.findIndex(member => member.id > userId) - 1
                    if(indexToInsert === -1) indexToInsert = 0
                    return [...offlineMembers.slice(0, indexToInsert), userInOnlineList, ...offlineMembers.slice(indexToInsert, offlineMembers.length)]
                })
            };
        }


        let roomInfo = {type};
        if (type === "public") {
            roomInfo.channel_id = channel.id;
        } else {
            roomInfo.conversation_id = conversationId;
            roomInfo.recipient_id = recipientId;
        }

        socket.emit("join", roomInfo);
        socket.on("message", socketOnChat);
        socket.on(`${type}_edit`, socketOnEdit);
        socket.on(`${type}_delete`, socketOnDelete);
        socket.on("user_list", socketOnUserList);
        socket.on("user_online", socketOnUserOnline);
        socket.on("user_offline", socketOnUserOffline);

        return () => {
            socket.off("message", socketOnChat);
            socket.off(`${type}_edit`, socketOnEdit);
            socket.off(`${type}_delete`, socketOnDelete);
            socket.off("user_list", socketOnUserList);
            socket.off("user_online", socketOnUserOnline);
            socket.off("user_offline", socketOnUserOffline);
            socket.emit("leave", roomInfo);
        };
    };
};

export default createSocketUseEffect;
