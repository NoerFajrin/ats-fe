import {io} from 'socket.io-client'

const URL = import.meta.env.VITE_WS_ENDPOINT

const SocketHelper = {
    createConnection: io(URL)
}

export default SocketHelper