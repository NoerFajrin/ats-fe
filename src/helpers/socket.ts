import {io} from 'socket.io-client'

const URL = `http://localhost:2223`
const SOCKET_CONFIG = {

}
const SocketHelper = {
    createConnection: io(URL)
}

export default SocketHelper