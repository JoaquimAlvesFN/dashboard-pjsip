import Io from 'socket.io-client';

const socket = Io.connect('http://localhost:3333');

export default socket;