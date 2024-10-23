import {useState, useEffect} from 'react';
import './ScreenCrack.scss';

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
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
        <div>
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
                            <span className="numpad__number">{i + 1}</span>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default ScreenCrack;