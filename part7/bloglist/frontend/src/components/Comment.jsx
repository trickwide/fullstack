import { useSelector } from 'react-redux'
import CommentForm from './CommentForm'

const Comment = ({ id }) => {
  const comments = useSelector((state) => state.comments)[id] || []

  return (
    <div>
      <h3>comments</h3>
      <CommentForm id={id} />
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </div>
  )
}

export default Comment
