import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { doc, deleteDoc } from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import { makeStyles } from '@mui/material/styles'
import { LIST_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'

function CityTile({ name, cityId, createdAt, showDelete }) {
  const theme = useTheme()
  const history = useHistory()
  const { showError, showSuccess } = useNotifications()
  const firestore = useFirestore()

  function goToCity() {
    return history.push(`${LIST_PATH}/${cityId}`)
  }

  async function deleteCity() {
    try {
      await deleteDoc(doc(firestore, `cities/${cityId}`))
      showSuccess('City deleted successfully')
    } catch(err) {
      console.error('Error deleting city:', err) // eslint-disable-line no-console
      showError(err.message || 'Could not delete city')
      throw err
    }
  }

  return (
    <Card role="listitem" sx={{ minWidth: 300, minHeight: 200, margin: theme.spacing(0.5) }}>
      <CardHeader
        action={
          showDelete ? (
            <Tooltip title="Delete">
              <IconButton onClick={deleteCity}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null
        }
        title={name}
        subheader={createdAt?.toDate().toDateString()}
      />
    </Card>
  )
}

CityTile.propTypes = {
  cityId: PropTypes.string.isRequired,
  showDelete: PropTypes.bool,
  name: PropTypes.string
}

CityTile.defaultProps = {
  showDelete: true
}

export default CityTile
