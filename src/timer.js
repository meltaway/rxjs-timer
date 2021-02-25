import {Subject} from "rxjs"

const subject = new Subject()
const initialState = {
    buttonText: "START",
    time: {
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    isStarted: false,
    timeStamp: 0,
    interval: null
}
let state = initialState

const timer = {
    initialState,
    init: () => subject.next(state),

    subscribe: setState => subject.subscribe(setState),

    start: () => {
        state = {
            ...state,
            isStarted: true,
            buttonText: "STOP",
            interval: setInterval(() => {
                if (state.time.seconds === 59 && state.time.minutes === 59) // next hour
                    state = {
                        ...state,
                        time: {
                            hours: state.time.hours + 1,
                            minutes: 0,
                            seconds: 0
                        }
                    }
                else if (state.time.seconds === 59) // next minute
                    state = {
                        ...state,
                        time: {
                            ...state.time,
                            minutes: state.time.minutes + 1,
                            seconds: 0
                        }
                    }
                else
                    state = {
                        ...state,
                        time: {
                            ...state.time,
                            seconds: state.time.seconds + 1
                        }
                    }

                subject.next(state)
            }, 1000)
        }
        subject.next(state)
    },

    // set to initial state
    stop: () => {
        clearInterval(state.interval)
        state = initialState
        subject.next(state)
    },

    // set time to zero, don't stop counter
    reset: () => {
        clearInterval(state.interval)
        state = {
            ...state,
            time: initialState.time,
            buttonText: "STOP"
        }
        subject.next(state)
    },

    // stops time without resetting, but continues if you switch tabs
    wait: () => {
        clearInterval(state.interval)
        state = {
            ...state,
            isStarted: false,
            buttonText: "START"
        }
        subject.next(state)
    },
}
export default timer