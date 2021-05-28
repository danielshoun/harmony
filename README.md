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
- Search for servers to join
- Enter public text channels to communicate with other users in real-time
- Privately message individual users to communicate with one another in real-time

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

```js
// Insert here
```

```py
# Insert here
```

## Future To Do Items

- [ ] Creating a role system
- [ ] Adding a friends system
- [ ] Implementing voice chat
