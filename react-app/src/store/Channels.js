const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";

const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel,
});

const getChannels = (channels) => ({
  type: GET_CHANNELS,
  channels,
});

export const getServerChannels = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/channels/server/${serverId}`);
  if (res.ok) {
    const channels = await res.json();
    dispatch(getChannels(channels));
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

const initialState = { channels: [] };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNELS:
      return { channels: [...action.channels] };
    case ADD_CHANNEL:
      let newState = { ...state };
      newState.channels = [...newState.channels, action.channel];
      return newState;
    default:
      return state;
  }
}
