import { useState } from 'react';
import styles from './compStyles/Signup.module.scss'
import { Grid, Input, Spacer } from '@nextui-org/react';
import Link from 'next/link';


function Signup() {

  const [showPassword, setShowPassword] = useState(true)

  const handleShowPassword = ()=> {
    setShowPassword(!showPassword) 
  }
  console.log(showPassword)
  
  return (
      <div className={styles.container}>
        <p className={styles.p_start}>Start for free</p>
        <h1>Create new account <span>.</span></h1>
        <p className={styles.p_end}>Already a Member?<span><Link href="/login"> Log in</Link></span></p>
        
        <form action="">

          <Grid.Container gap={0} justify="start" className={styles.first_input}>   
            <Grid className={styles.first_input_grid}>
              <input type="text" placeholder='First name'/>
            </Grid>
            <Grid className={styles.second_input_grid}>
              <input type="text" placeholder='Last name'/>
            </Grid>
          </Grid.Container>

          <Spacer y={1}/>

          <Grid.Container gap={0} justify="start" fullWidth={true} className={styles.second_input}>   
            <Grid>
              <input type="email" placeholder='Email'/>
            </Grid>
          </Grid.Container>

          <Spacer y={1}/>

          <Grid.Container gap={0} justify="start" className={styles.third_input}>   
            <Grid>
              <input type={showPassword ? 'password' : 'text' } placeholder='Password'/>
              <span onClick={handleShowPassword}>{showPassword ? <p>Show</p> : <p>Hide</p>}</span>
            </Grid>
          </Grid.Container>

          <Spacer y={1}/>

          <Grid.Container gap={0} justify="start" className={styles.sign_btn}>   
            <Grid>
              <input type="submit" value="Create account"/>
            </Grid>
          </Grid.Container>
        </form>

      </div>
  )
}

export default Signup