import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createComments } from '../reducers/commentReducer'
import { Box, Button, TextField } from '@mui/material'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''

    dispatch(createComments(id, comment))
    dispatch(setNotification(`new comment added: ${comment}`, 5))
  }

  return (
    <Box>
      <form onSubmit={addComment}>
        <Box sx={{ mb: 2 }}>
          <TextField id="comment" type="text" label="Add comment" />
        </Box>
        <Button sx={{ mb: 2 }} variant="contained" type="submit">
          Submit comment
        </Button>
      </form>
    </Box>
  )
}

export default CommentForm
