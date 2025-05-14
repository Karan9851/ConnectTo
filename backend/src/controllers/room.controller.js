import { v4 as uuidv4 } from 'uuid';
import server from '../environment.js';

const rooms = {}; // In-memory storage for rooms

// Create a new room
export const createRoom = (req, res) => {
    const roomId = uuidv4();
    rooms[roomId] = { participants: [] };
    res.status(201).json({ roomLink: `${server}/room/${roomId}` });
};

export const joinRoom = (req, res) => {
    const { roomId } = req.params;
    if (rooms[roomId]) {
        res.status(200).json({ message: 'Room joined successfully', roomId });
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
};
