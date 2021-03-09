import { createContext, ReactNode, useState } from "react";

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number; 
    currentExperience: number 
    challengesCompleted: number;
    experienceToNextLevel:number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
  }

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallangesProvider({children} : ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
    }
    
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)
    }
    
    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        const {amount} = activeChallenge;
        let newExperience = currentExperience + amount;
        console.log(experienceToNextLevel);
        if(newExperience > experienceToNextLevel) {
            levelUp();
            newExperience = newExperience - experienceToNextLevel;
        }

        setCurrentExperience(newExperience);
        resetChallenge();
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge
            }}
          >
            {children}
        </ChallengesContext.Provider>
    );
}