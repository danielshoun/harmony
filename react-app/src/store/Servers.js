const GET_SERVERS = "servers/GET_SERVERS";
const ADD_SERVER = "servers/ADD_SERVER";
const REMOVE_SERVER = "servers/REMOVE_SERVER";
const JOIN_SERVER = "servers/JOIN_SERVER";
const LEAVE_SERVER = "servers/LEAVE_SERVER";
const EDIT_SERVER = "servers/EDIT_SERVER";
const ADD_CHANNEL = "servers/ADD_CHANNEL";

const getServers = (servers, allServers) => {
  return {
    type: GET_SERVERS,
    servers,
    allServers,
  };
};

const addServer = (server) => ({
  type: ADD_SERVER,
  server,
});

const removeServer = (server) => ({
  type: REMOVE_SERVER,
  server,
});

const joinServer = (server) => ({
  type: JOIN_SERVER,
  server,
});

const leaveServer = (server) => ({
  type: LEAVE_SERVER,
  server,
});

const editServer = (server) => ({
  type: EDIT_SERVER,
  server,
});

const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel,
});

export const fetchMemberServers = () => async (dispatch) => {
  const res2 = await fetch("/api/servers/");
  const res = await fetch("/api/servers/member");

  // console.log(res.ok)
  if (res.ok) {
    const servers = await res.json();
    const allServers = await res2.json();
    // console.log(servers)
    dispatch(getServers(servers, allServers));
  }
};

export const createAServer = (server) => async (dispatch) => {
  const res = await fetch("/api/servers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: server.name, url: server.picture_url }),
  });

  if (res.ok) {
    const newServer = await res.json();

    dispatch(addServer(newServer));
    return newServer;
  }
};

export const deleteServer = (server) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeServer(server));
  }
};

export const editAServer = (server) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: server.name,
      url: server.picture_url,
    }),
  });
  if (res.ok) {
    const server = await res.json();
    dispatch(editServer(server));
    return server;
  }
};

export const createChannel = (channel) => async (dispatch) => {
  const res = await fetch("/api/channels/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: channel.name,
      description: channel.description,
      server_id: channel.server_id,
    }),
  });
  if (res.ok) {
    const channel = await res.json();
    dispatch(addChannel(channel));
    return channel;
  }
};

export const serverJoin = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}/join`, {
    method: "POST",
  });

  if (res.ok) {
    const server = await res.json();
    console.log(server);
    dispatch(joinServer(server));
  }
};

export const serverLeave = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}/leave`, {
    method: "DELETE",
  });

  if (res.ok) {
    const server = await res.json();
    dispatch(leaveServer(server));
  }
};

const initalState = { userServers: [], allServers: [] };

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case GET_SERVERS:
      return { userServers: action.servers, allServers: action.allServers };
    case ADD_SERVER: {
      const userServers = [...state.userServers, action.server];
      const allServers = [...state.allServers, action.server];
      const newState = { userServers, allServers };
      return newState;
    }
    case REMOVE_SERVER: {
      const userIndex = state.userServers.findIndex(
        (server) => server.id === action.server.id
      );
      const allIndex = state.allServers.findIndex(
        (server) => server.id === action.server.id
      );
      const userServers = [
        ...state.userServers.slice(0, userIndex),
        ...state.userServers.slice(userIndex + 1),
      ];
      const allServers = [
        ...state.userServers.slice(0, allIndex),
        ...state.userServers.slice(allIndex + 1),
      ];
      return { userServers, allServers };
    }
    case JOIN_SERVER:
      return {
        userServers: [...state.userServers, action.server],
        allServers: [...state.allServers],
      };
    case LEAVE_SERVER: {
      const userIndex = state.userServers.indexOf(
        state.userServers.find((server) => server.id === action.server.id)
      );
      const userServers = [
        ...state.userServers.slice(0, userIndex),
        ...state.userServers.slice(userIndex + 1),
      ];
      return { userServers, allServers: [...state.allServers] };
    }
    case EDIT_SERVER: {
      const userIndex = state.userServers.findIndex(
        (server) => server.id === action.server.id
      );
      const allIndex = state.allServers.findIndex(
        (server) => server.id === action.server.id
      );
      const userServers = [
        ...state.userServers.slice(0, userIndex),
        ...state.userServers.slice(userIndex + 1),
      ];
      const allServers = [
        ...state.userServers.slice(0, allIndex),
        ...state.userServers.slice(allIndex + 1),
      ];
      userServers.push(action.server);
      allServers.push(action.server);
      return { userServers, allServers };
    }
    case ADD_CHANNEL:
      const newState = {
        userServers: [...state.userServers],
        allServers: [...state.allServers],
      };
      const userServersIndex = state.userServers.findIndex(
        (server) => server.id === action.channel.server_id
      );
      const allServersIndex = state.allServers.findIndex(
        (server) => server.id === action.channel.server_id
      );
      const userServer = newState.userServers[userServersIndex];
      userServer.channels.push(action.channel);
      const allServer = newState.allServers[allServersIndex];
      allServer.channels.push(action.channel);
      return newState;
    default:
      return state;
  }
}
