import React, { useEffect, useState } from 'react';
import Weather from './components/WeatherCard';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';
import { BrowserRouter as Router } from 'react-router-dom';
import config from 'config';
import NotificationsProvider from 'modules/notification/NotificationsProvider';
import ThemeProvider from 'modules/theme/ThemeProvider';
import WeatherCard from 'routes/Home/components/HomePage/HomePage';
import { StyledEngineProvider } from '@mui/material/styles';
import FirebaseComponents from 'components/FirebaseComponents';
import { createTheme } from '@mui/material/styles';
import theme from './theme';
import createRoutes from './routes';
import { Dimmer, Loader } from 'semantic-ui-react';


function App() {
  const routes = createRoutes()
  
  return (
    
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <FirebaseAppProvider firebaseConfig={config.firebase} suspense>
            <FirebaseComponents>
              <NotificationsProvider>
                <Router>{routes}</Router>
              </NotificationsProvider>
            </FirebaseComponents>
          </FirebaseAppProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    
  )
}

export default App
