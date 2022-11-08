import {React, useState} from 'react';
import Sketch from "react-p5";

export const Draw = () => {

    const [data, setData] = useState([]);
    console.log(data)

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(1100, 1100).parent(canvasParentRef);
        p5.loadImage("./Untitled.png", img => {
            p5.image(img, 0, 0);
        })
    };

    const draw = (p5) => {
        data.forEach((entry) => {
            p5.fill(255);
            p5.stroke(255)
            p5.ellipse(entry.carCoordinates[0][0] * 0.76 + 570, entry.carCoordinates[0][2] * 0.76  + 415, 3, 3)
            p5.ellipse(570, 415, 30, 30)
        });
    };

    return (
        <div>
            <div>
                <Sketch setup={setup} draw={draw}/>
            </div>
        </div>
    )
}
