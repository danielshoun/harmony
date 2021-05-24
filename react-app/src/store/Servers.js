const GET_SERVERS = 'servers/GET_SERVERS'

const getServers = (servers) => {
    return {
        type: GET_SERVERS,
        servers
    }
}

export const fetchMemberServers = () => async (dispatch) => {
    const res = await fetch('/api/servers/member')
    console.log(res.ok)
    if(res.ok){
        const servers = await res.json()
        console.log(servers)
        dispatch(getServers(servers))
    }
}

const initalState = {userServers: [], allServers: []}

export default function reducer(state = initalState, action){
    switch(action.type){
        case GET_SERVERS:
            return {userServers: action.servers, allServers: [...state.allServers]}
        default:
            return state
    }
}