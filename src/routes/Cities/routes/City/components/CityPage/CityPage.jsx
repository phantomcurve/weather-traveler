import React from 'react'
import Card from '@mui/material/Card'
import { styled, useTheme } from '@mui/material/styles'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import CityData from '../CityData'

export const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(2)
}));

function CityPage() {
  const theme = useTheme()
  return (
    <Root>
      <Card sx={{ marginBottom: theme.spacing(2) }}>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-city">
          <CityData />
        </SuspenseWithPerf>
      </Card>
    </Root>
  )
}

export default CityPage
