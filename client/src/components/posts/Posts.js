import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import PostItem from './PostItem'
import PostForm from './PostForm'
import { getPosts } from '../../actions/post'

const Posts = () => {
  const { posts } = useSelector((state) => state.post)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [getPosts])

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

export default Posts
