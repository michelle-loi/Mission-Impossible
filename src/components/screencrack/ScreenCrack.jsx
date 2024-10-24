import {useState, useEffect} from 'react';
import './ScreenCrack.scss';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import p5functions from "p5";

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function sketch(p5) {
    let permissionGranted = false;

    let setEnableNumpad;

    p5.updateWithProps = props => {
        setEnableNumpad = props.setEnableNumpad;
    };

    let canvas;

    p5.setup = () => {
        canvas = p5.createCanvas(0, 0);
        p5.loop();
        
        // DeviceOrientationEvent, DeviceMotionEvent
        if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
          // ios 13 device
          
          DeviceOrientationEvent.requestPermission()
            .catch(() => {
              // show permission dialog only the first time
              let button = p5.createButton("click to allow access to sensors");
              button.style("font-size", "24px");
              button.center();
              button.mousePressed( requestAccess );
              throw error;
            })
            .then(() => {
              // on any subsequent visits
              permissionGranted = true;
            })
        } else {
          // non ios 13 device
          p5.textSize(48);
          // text("non ios 13 device", 100, 100);
          permissionGranted = true;
        }
    }

    let shakeCount = 0;

    p5.deviceShaken = () => {
        shakeCount++;
        if(shakeCount > 20) {
            setEnableNumpad(true);
        }
    }
      
    function requestAccess() {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
            if (response == 'granted') {
                p5.permissionGranted = true;
            } else {
                p5.permissionGranted = false;
            }
            })
        .catch(console.error);
        
        this.remove();
    }
}

const ScreenCrack = () => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [enableNumpad, setEnableNumpad] = useState(false);

    useEffect(() => {
        if(timeLeft===0){
           return;
        }

        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [timeLeft]);

    return (
        <div className="screencrack_container">
            <div className="timer__container">
                <span className="timer__time">00:{pad(timeLeft, 2)}</span>
            </div>
            { !enableNumpad ? 
                (
                    <div className="disabled_numpad__container">
                        {[...Array(9)].map((x, i) =>
                            <span className="numpad__number">{i + 1}</span>
                        )}
                    </div>
                ) :
                (
                    <div className="numpad__container">
                        {[...Array(9)].map((x, i) =>
                            <span key={i} className="numpad__number">{i + 1}</span>
                        )}
                    </div>
                )
            }
            <ReactP5Wrapper id="screencrack_p5" sketch={sketch} setEnableNumpad={setEnableNumpad}></ReactP5Wrapper>
        </div>
    );
}

export default ScreenCrack;