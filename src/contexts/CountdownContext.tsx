import { createContext, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";
let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}) {
    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    // Essa função funciona como um observador dos valores passados como segundo parâmetro. 
    // Quando estes mudam, a função é executada
    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time]);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true)
    }
  
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);
    }

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
	        {children}
        </CountdownContext.Provider>
    );
}