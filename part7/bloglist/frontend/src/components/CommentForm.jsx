import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createComments } from '../reducers/commentReducer'

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
    <div>
      <form onSubmit={addComment}>
        <input id="comment" type="text" placeholder="add comment" />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm
