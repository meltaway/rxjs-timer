import React, { useState, useLayoutEffect } from "react"
import {Button} from '@material-ui/core'
import timer from "./timer"

function App() {
    const [state, setState] = useState(timer.initialState)

    useLayoutEffect(() => {
        timer.subscribe(setState)
        timer.init()
    }, [])

    //1
    const onStartStopClick = () => state.isStarted ? timer.stop() : timer.start()

    //2
    const onResetClick = () => {
        timer.reset()
        timer.start()
    }

    //3
    const onWaitClick = (event) => {
        if (event.timeStamp - state.timeStamp < 300 && state.timeStamp !== 0) // double click check
            timer.wait()
        else if (state.timeStamp === 0)
            setState(prevState => ({
                ...(prevState),
                timeStamp: event.timeStamp
            }))
        else
            setState(prevState => ({
                ...(prevState),
                timeStamp: event.timeStamp
            }))
    }

    return (
        <div className="wrapper">
            <div className="timer">
                {state.time.hours < 10 ? "0" + state.time.hours : state.time.hours}:
                {state.time.minutes < 10 ? "0" + state.time.minutes : state.time.minutes}:
                {state.time.seconds < 10 ? "0" + state.time.seconds : state.time.seconds}
            </div>
            <div className="buttons">
                <Button variant="contained" color="primary" onClick={onStartStopClick}>{state.buttonText}</Button>
                <Button variant="contained" color="primary" onClick={onWaitClick}>Wait</Button>
                <Button variant="contained" color="primary" onClick={onResetClick}>Reset</Button>
            </div>
        </div>
    );
}

export default App;
