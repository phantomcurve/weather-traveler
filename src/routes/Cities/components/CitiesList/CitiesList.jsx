import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { getFirestore, collection, addDoc, query, where, orderBy, serverTimestamp, documentId } from 'firebase/firestore'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { CITIES_COLLECTION } from 'constants/firebasePaths'
import CityCard from '../CityCard'
import NewCityDialog from '../NewCityDialog'
import { Root, CardsList } from './CitiesList.styled'

function useCitiesList() {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in CitiesList)
  const { data: auth } = useUser()
  const firestore = useFirestore()
  const citiesRef = collection(firestore, CITIES_COLLECTION)
  // Create a ref for cities owned by the current user
  const citiesQuery = query(
    citiesRef,
    where('createdBy', '==', auth?.uid),
    orderBy(documentId())
  )

  // Query for cities (loading handled by Suspense in CitiesList)
  const { data: cities } = useFirestoreCollectionData(citiesQuery, {
    idField: 'id'
  })

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  async function addCity(newInstance) {
    try {
      await addDoc(
        collection(firestore, CITIES_COLLECTION),
        {
          ...newInstance,
          createdBy: auth.uid,
          createdAt: serverTimestamp()
        }
      )
      toggleDialog()
      showSuccess('City added successfully')
    } catch(err) {
      console.error('Error:', err) // eslint-disable-line no-console
      showError(err.message || 'Could not add city')
      throw err
    }
  }

  return { cities, addCity, newDialogOpen, toggleDialog }
}

function CitiesList() {
  const theme = useTheme()
  const {
    cities,
    addCity,
    newDialogOpen,
    toggleDialog
  } = useCitiesList()

  return (
    <Root>
      <Button variant="contained" onClick={toggleDialog}>
        Add City
      </Button>
      <NewCityDialog
        onSubmit={addCity}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <CardsList role="list">
        {cities?.length ?
          cities.map((city, ind) => {
            const { id: cityId, ...rest } = city || {}
            return (
              <CityCard
                key={city.id}
                cityId={cityId}
                {...rest}
              />
            )
          })
        : (
          <Typography sx={{ padding: theme.spacing(4) }} variant="h5">
            No Cities Found. Click "Add City" above to add one
          </Typography>
        )}
      </CardsList>
    </Root>
  )
}

export default CitiesList
