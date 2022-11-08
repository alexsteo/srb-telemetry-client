import {React, useEffect, useState} from 'react';
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import {io} from "socket.io-client";
import {stopData} from "../api/socketConnection";

const socket = io("http://localhost:3001");

export const Graph = () => {

    const [data, setData] = useState([]);
    const [read, setRead] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(() => {

        socket.on('telemetry_data', (currentData) => {
            console.log('sadas')
            console.log(currentData)
        });

        return () => {
            socket.off('data');
        };
    }, []);

    return (
        <div>
            <div style={{height: 400}}>
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
