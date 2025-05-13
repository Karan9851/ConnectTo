import React from 'react';
import { useParams } from 'react-router-dom';

function Room() {
    const { roomId } = useParams();

    return (
        <div>
            <h1>Welcome to Room: {roomId}</h1>
            {/* Add your room-specific functionality here */}
        </div>
    );
}

export default Room;