import {React, useEffect, useState} from 'react';
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import {io} from "socket.io-client";
import {stopData} from "../api/socketConnection";

const socket = io("http://localhost:3001");

const json = require('../telemetry-2022-11-04T14-23-23.json')
export const Graph = () => {

    const [data, setData] = useState(json);
    const [read, setRead] = useState(false);
    const [show, setShow] = useState(true);

    console.log(data)


    useEffect(() => {

        socket.on('send_acc_data', (currentData) => {
            if (currentData.speedKmh > 0) {
                console.log("received")
                setData(old => [...old, {...currentData, timestamp: Date.now()}])
            }
        });

        return () => {
            socket.off('data');
        };
    }, []);

    const stopRead = () => {
        setRead(false);
        stopData(socket);
        if (data.length > 0) {
            setShow(true);
        }
        console.log(data)
    }

    const startRead = () => {
        setRead(true);
        socket.emit("req_acc_data");
    }

    return (
        <div>
            <div style={{height: 400}}>
                <button onClick={startRead}>Start read</button>
                <button onClick={stopRead}>Stop read</button>
                {show &&
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}>
                            <XAxis dataKey="timestamp"/>
                            <Tooltip/>
                            <Legend/>
                            {/*<Line type="monotone" strokeWidth={1} dot={false} dataKey="speedKmh" stroke="#0000ff"/>*/}
                            <Line type="monotone" strokeWidth={1} dot={false} dataKey="gas" stroke="#ff0000"/>
                            {/*<Line type="monotone" strokeWidth={1} dot={false} dataKey="brake" stroke="#00ff00"/>*/}
                            {/*<Line type="monotone" strokeWidth={1} dot={false} dataKey="wheelPressure[0]" stroke="#00ff00"/>*/}
                            {/*<Line type="monotone" strokeWidth={1} dot={false} dataKey="wheelPressure[1]" stroke="#ff0000"/>*/}
                            {/*<Line type="monotone" strokeWidth={1} dot={false} dataKey="wheelPressure[2]" stroke="#0000ff"/>*/}
                            {/*<Line type="monotone" strokeWidth={1} dot={false} dataKey="wheelPressure[3]" stroke="#ff00ff"/>*/}
                        </LineChart>
                    </ResponsiveContainer>}
            </div>
        </div>
    )
}
