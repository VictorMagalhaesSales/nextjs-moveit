import Head from "next/head";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallanges } from "../components/CompletedChallanges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/components/Home.module.css';

export default function Home() {
  return (    
  <div className={styles.container}>
    <Head>
      <title>Início / move.it</title>
    </Head>
    <ExperienceBar/>
    
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
  </div>
  )
}
