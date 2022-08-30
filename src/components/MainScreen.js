import {React, useEffect, useState} from 'react';
import io from 'socket.io-client';
import Sketch from "react-p5";

const socket = io("ws://localhost:3001");

let locations = []

export const MainScreen = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        console.log("conn")
        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit("app_start", "adasda")
        });

        socket.on('message', (message) => {
            setMessage(message);
        });

        socket.on('data', (data) => {
            const id = data.graphics.playerCarID;
            let coordinates = data.graphics.carCoordinates[id];
            const [x, y, z] = coordinates;
            setMessage([x, y, z])
            locations.push([x + 1000, z + 500])
        });

        return () => {
            socket.off('connect');
            socket.off('message');
        };
    }, []);

    let x = 50;
    let y = 50;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(1000, 1000).parent(canvasParentRef);
        p5.background(0);
    };

    const draw = (p5) => {
        console.log(locations)
        locations.forEach(([x, z]) => p5.ellipse(x, z, 5, 5));
    };

    return (
        <div>
            <Sketch setup={setup} draw={draw}/>;
            <h1>
                {isConnected.toString() + " " + message}
            </h1>
        </div>
    )
}


