const GET_CHANNELS = 'servers/GET_CHANNELS'


export const getChannels = (serverId) => async (dispatch) => {
    const res = await fetch(`/api/servers`)
}