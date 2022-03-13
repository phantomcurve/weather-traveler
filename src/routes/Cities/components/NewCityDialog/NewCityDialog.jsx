import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { styled } from '@mui/material/styles';

export const NewCityForm = styled('form')(({ theme }) => ({
  padding: theme.spacing(2)
}));

function NewCityDialog({ onSubmit, open, onRequestClose }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm({ mode: 'onChange' })

  return (
    <Dialog open={open} onClose={onRequestClose}>
      <DialogTitle id="new-city-dialog-title">New City</DialogTitle>
      <NewCityForm onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            error={!!errors.name}
            helperText={errors.name && 'Name is required'}
            label="City Name"
            autoFocus
            inputProps={{
              tabIndex: 1,
              ...register('name', {
                required: true,
              })
            }}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onRequestClose} tabIndex={3}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={isSubmitting || !isValid}
            tabIndex={2}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </NewCityForm>
    </Dialog>
  )
}

NewCityDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default NewCityDialog
