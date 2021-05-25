const GET_SERVERS = 'servers/GET_SERVERS'
const ADD_SERVER = 'servers/ADD_SERVER'
const REMOVE_SERVER = 'servers/REMOVE_SERVER'
const JOIN_SERVER = 'servers/JOIN_SERVER'
const LEAVE_SERVER = 'servers/LEAVE_SERVER'

const getServers = (servers, allServers) => {
    return {
        type: GET_SERVERS,
        servers,
        allServers
    }
}


const addServer = (server) => ({
    type: ADD_SERVER,
    server
})


const removeServer = (server) => ({
    type: REMOVE_SERVER,
    serverId
})


const joinServer = (serverId) => ({
    type: JOIN_SERVER,
    serverId
})


const leaveServer = (serverId) => ({
    type: LEAVE_SERVER,
    serverId
})


export const fetchMemberServers = () => async (dispatch) => {
    const res2 = await fetch('/api/servers/')
    const res = await fetch('/api/servers/member')

    // console.log(res.ok)
    if(res.ok){
        const servers = await res.json()
        const allServers = await res2.json()
        // console.log(servers)
        dispatch(getServers(servers, allServers))
    }
}


export const createAServer = (server) => async (dispatch) => {
    const res = await fetch('api/servers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': server.name, 'picture_url': server.picture_url})
    })

    if(res.ok){
        const newServer = await res.json()

        dispatch(addServer(newServer))
    }
}


export const deleteServer = (server) => async (dispatch) => {
    const res = await fetch(`api/servers/${server.id}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        dispatch(removeServer(server))
    }
}


export const serverJoin = (serverId) => (dispatch) => {
    const res = await fetch(`api/servers/${serverId}/join`, {
        method: 'POST'
    })

    if (res.ok) {
        server = await res.json()
        dispatch(joinServer(server))
    }
}


export const serverLeave = (serverId) => (dispatch) => {
    const res = await fetch(`api/servers/${serverId}/leave`, {
        method: 'DELETE'
    })

    if (res.ok) {
        server = await res.json()
        dispatch(leaveServer(server))
    }
}


const initalState = {userServers: [], allServers: []}

export default function reducer(state = initalState, action){
    switch(action.type){
        case GET_SERVERS:
            return {userServers: action.servers, allServers: action.allServers}
        case ADD_SERVER:{
            const userServers = [...state.userServers, action.server]
            const allServers = [...state.allServers, action.server]
            const newState = {userServers, allServers}
            return newState
        }
        case REMOVE_SERVER:{
            const userIndex = state.userServers.indexOf(action.server)
            const allIndex = state.allServers.indexOf(action.server)
            const userServers = [...state.userServers.slice(0, userIndex), ...state.userServers.slice(userIndex + 1)]
            const allServers = [...state.userServers.slice(0, allIndex), ...state.userServers.slice(allIndex + 1)]
            return { userServers, allServers }
        }
        case JOIN_SERVER:
            return {userServers: [...state.userServers, action.server], allServers: [...state.allServers]}
        case LEAVE_SERVER:{
            const userIndex = state.userServers.indexOf(action.server)
            const userServers = [...state.userServers.slice(0, userIndex), ...state.userServers.slice(userIndex + 1)]
            return {userServers, allServers: [...state.allServers]}
        }
        default:
            return state
    }
}