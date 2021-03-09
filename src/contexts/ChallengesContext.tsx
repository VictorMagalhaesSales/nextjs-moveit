import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect, useState } from "react";
import { LevelUpModal } from '../components/LevelUpModal';
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
    closeLevelUpModal: () => void;
  }

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
  
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest} : ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ||1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ||0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ||0);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1)
    
        setIsLevelUpModalOpen(true)
      }
    
      function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
      }
    
    
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play;

        if(Notification.permission === 'granted') {
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount}`
            });
        }
    }
    
    function resetChallenge() {
        setActiveChallenge(null);
    }

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

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
            completeChallenge,
            closeLevelUpModal
            }}
          >
            {children}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}