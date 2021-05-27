const createSocketUseEffect = (
    type,
    socket,
    setMessages,
    messages,
    channel = null,
    conversationId = null,
    recipientId = null
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

        let roomInfo = {type}
        if(type === "public") {
            roomInfo.channel_id = channel.id;
        } else {
            roomInfo.conversation_id = conversationId
            roomInfo.recipient_id = recipientId
        }

        socket.emit("join", roomInfo);
        socket.on("message", socketOnChat);
        socket.on(`${type}_edit`, socketOnEdit);
        socket.on(`${type}_delete`, socketOnDelete);

        return () => {
            socket.off("message", socketOnChat);
            socket.off(`${type}_edit`, socketOnEdit);
            socket.off(`${type}_delete`, socketOnDelete);
            socket.emit("leave", roomInfo);
        };
    };
};

export default createSocketUseEffect;
