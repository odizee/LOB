import { Container, Row, Col, Card, Text } from '@nextui-org/react';
import PlayerImages from '../components/Onboarding/PlayerImages';
import Signup from '../components/Onboarding/Signup';
import styles from '../styles/OnboardingPage.module.scss';
import Link from 'next/link';
import Head from 'next/head';

function signup() {
  return (
    <div className={`${styles.onboarding} h-screen`}>
      <Head>
        <title>LOB || Signup</title>
      </Head>
      <PlayerImages />
      <div
        className={`${
          (styles.onboarding__right_signup, styles.onboarding__right)
        } grid pt-16 pb-10 pl-36`}
      >
        <Signup />
      </div>
    </div>
  );
}

export default signup;
