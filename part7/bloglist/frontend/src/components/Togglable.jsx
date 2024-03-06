import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { marginBottom: 10, display: visible ? 'none' : '' }
  const showWhenVisible = { marginBottom: 10, display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Box>
      <Box style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible}>
        {props.children}
        <Button variant="contained" onClick={toggleVisibility}>
          cancel
        </Button>
      </Box>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
