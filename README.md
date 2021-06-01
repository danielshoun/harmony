# Welcome to Harmony!

### **Live Link: [Harmony](https://harmony-app-aa.herokuapp.com/)**

**Harmony** is a real-time messaging application heavily inspired by [Discord](https://discord.com/). The site allows users to create an account, join and create servers, and talk to others via channels in their joined servers.

Check out the [wiki](https://github.com/danielshoun/harmony/wiki) for more information!

## Technologies

#### Front-End

- React
- Redux
- CSS

#### Back-End

- Python
- PostgreSQL
- Flask
- SQLAlchemy
- SocketIO

## Features

- Sign up a new account and log in
- Create / Edit / Join / Delete servers
- Create / Edit / Delete channels
- Edit User Username, Email, and Profile picture
- Search for servers to join
- Enter public text channels to communicate with other users in real-time
- Privately message individual users to communicate with one another in real-time
- Receive notifications when a user messages you in real-time
- See a list of online and offline users updated in real-time

## Instructions

To run this application:

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/danielshoun/harmony.git
   ```

2. Install dependencies

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the **.env.example** file
4. Setup a PostgreSQL user, password and database that matches the **.env** file

5. Enter the python virtual environment, migrate the database, seed the database, and run the flask app

   ```bash
   pipenv shell
   ```
   ```bash
   flask db upgrade
   ```
   ```bash
   flask seed all
   ```
   ```bash
   flask run
   ```

6. Install front end dependencies from the `react-app` directory and then run the front end server
   ```bash
   npm install && npm run
   ```

## Code Snippets

The socket event listeners were able to be re-used between our public and private chat components by creating a function that would generate an agnostic useEffect hook. A shortened version of this function is shown below; the full implementation can be seen in the [createSocketUseEffect utils file](https://github.com/danielshoun/harmony/blob/main/react-app/src/utils/createSocketUseEffect.js).

```js
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
            // Add new chat message.
        }

        function socketOnEdit(newMessage) {
            // Change message when edited by user.
        }

        function socketOnDelete({messageId}) {
            // Remove message when deleted by user.
        }

        let socketOnUserList;
        let socketOnUserOnline;
        let socketOnUserOffline;

        if (server) {
            socketOnUserList = (data) => {
                // Get initial list of online/offline users when joining a server.
            };

            socketOnUserOnline = ({userId}) => {
                // Update user lists when a user comes online.
            };

            socketOnUserOffline = ({userId}) => {
                // Update user lists when a user goes offline.
            };
        }


        let roomInfo = {type};
        if (type === "public") {
            roomInfo.channel_id = channel.id;
        } else {
            roomInfo.conversation_id = conversationId;
            roomInfo.recipient_id = recipientId;
        }

        // Add event listeners for the functions defined above.

        return () => {
            // Remove event listeners for cleanup.
        };
    };
};

export default createSocketUseEffect;
```

## Future To Do Items

- [ ] Creating a role system
- [ ] Adding a friends system
- [ ] Implementing voice chat
