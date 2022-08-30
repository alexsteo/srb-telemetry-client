import {React, useEffect, useState} from 'react';
import io from 'socket.io-client';

const socket = io("ws://localhost:3001");

export const MainScreen = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        console.log("conn")
        socket.on('connect', () => {
            setIsConnected(true);
            console.log("conn")
            socket.emit("app_start", "adasda")
        });

        socket.on('message', (message) => {
            setMessage(message);
        });

        return () => {
            socket.off('connect');
            socket.off('message');
        };
    }, );

    return (
        <div>
            <h1>
                {isConnected.toString() + " " + message}
            </h1>
        </div>
    )
}
