import React from 'react'
import './Styles.css';
import moment from 'moment';
// import { Button } from 'semantic-ui-react';
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import {
  ACCOUNT_PATH,
  LIST_PATH,
} from 'constants/paths'

const reactRouterUrl = 'https://github.com/ReactTraining/react-router'
const reactfireUrl = 'https://github.com/FirebaseExtended/reactfire'

const Root = styled('div')(({ theme }) => ({
  ...theme.flexColumnCenter,
  padding: theme.spacing(2),
}));


const Section = styled(Grid)(({ theme }) => ({
  ...theme.flexColumnCenter,
  padding: theme.spacing(2),
  textAlign: 'center'
}));

function Home() {
  return (
    <Root>
      <Typography variant="h3" component="h3" gutterBottom>
        Feels Like
      </Typography>
 
          <Section item xs>
            <Typography variant="h6" gutterBottom>
              *today's weather vibe goes here*
            </Typography>
            <ul>
              <li>
                <Button component={RouterLink} to={LIST_PATH}>Your Cities Forecast</Button>
              </li>
              <li>
                <Button component={RouterLink} to={ACCOUNT_PATH}>Account</Button>
              </li>
            </ul>
          </Section>
    </Root>
  )
}

export default Home

