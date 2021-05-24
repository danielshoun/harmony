const GET_SERVERS = 'servers/GET_SERVERS'

const getServers = (servers, allServers) => {
    return {
        type: GET_SERVERS,
        servers,
        allServers
    }
}

export const fetchMemberServers = () => async (dispatch) => {
    const res2 = await fetch('/api/servers/')
    const res = await fetch('/api/servers/member')

    console.log(res.ok)
    if(res.ok){
        const servers = await res.json()
        const allServers = await res2.json()
        console.log(servers)
        dispatch(getServers(servers, allServers))
    }
}


const initalState = {userServers: [], allServers: []}

export default function reducer(state = initalState, action){
    switch(action.type){
        case GET_SERVERS:
            return {userServers: action.servers, allServers: action.allServers}
        default:
            return state
    }
}