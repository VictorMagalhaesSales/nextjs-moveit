import { GetServerSideProps } from "next";
import Head from "next/head";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallanges } from "../components/CompletedChallanges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import styles from '../styles/components/Home.module.css';

export default function Home({ level, currentExperience, challengesCompleted }) {
  return (   
  <ChallengesProvider
    level={Number(level)} 
    currentExperience={Number(currentExperience)} 
    challengesCompleted={Number(challengesCompleted)}>

    <div className={styles.container}>
      <Head>
        <title>Início / move.it</title>
      </Head>
      <ExperienceBar/>
    
      <CountdownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallanges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownProvider>
    </div>    
  </ChallengesProvider>

  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }

} 