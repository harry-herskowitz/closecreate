import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import { getPost } from '../../actions/post'

const Post = ({ match }) => {
  const { post, loading } = useSelector((state) => state.post)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost(match.params.id))
  }, [dispatch, match.params.id])

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

export default Post
