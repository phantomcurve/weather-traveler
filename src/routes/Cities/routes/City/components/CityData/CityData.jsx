import React from 'react'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { useFirestoreDocData, useFirestore } from 'reactfire'
import { CITIES_COLLECTION } from 'constants/firebasePaths'

function CityData() {
  const { cityId } = useParams()
  const firestore = useFirestore()
  const cityRef = doc(firestore, CITIES_COLLECTION, cityId)

  const { data: city } = useFirestoreDocData(cityRef)

  return (
    <CardContent>
      <Typography component="h2">
        {(city && city.name) || 'City'}
      </Typography>
      <Typography>{cityId}</Typography>
      <div style={{ marginTop: '4rem' }}>
        <pre>{JSON.stringify(city, null, 2)}</pre>
      </div>
    </CardContent>
  )
}

export default CityData
