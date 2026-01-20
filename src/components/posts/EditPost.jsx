import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById, updatePost } from '../../services/posts'
import { getAllTopics } from '../../services/topics'
import './Posts.css'

// Get current post and populate a form with existing vallues
// Capture changes to the post from the user
// Update the existig post details
export const EditPost = ({ currentUser }) => {
  const { postId } = useParams()
  const [currentPost, setCurrentPost] = useState({})
  const [userChoices, setUserChoices] = useState({})
  const [topics, setTopics] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setCurrentPost(postObj)
      const choices = {
        topicId: postObj.topicId,
        title: postObj.title,
        body: postObj.body,
      }
      setUserChoices(choices)
    })
  }, [postId])

  useEffect(() => {
    getAllTopics().then(setTopics)
  }, [])

  const handleTopic = (event) => {
    const copy = { ...userChoices }
    copy.topicId = parseInt(event.target.value)
    setUserChoices(copy)
  }

  const handleTitle = (event) => {
    const copy = { ...userChoices }
    copy.title = event.target.value
    setUserChoices(copy)
  }

  const handleBody = (event) => {
    const copy = { ...userChoices }
    copy.body = event.target.value
    setUserChoices(copy)
  }

  const handleSave = (event) => {
    event.preventDefault()
    const updatedPost = {
      id: currentPost.id,
      title: userChoices.title,
      body: userChoices.body,
      date: currentPost.date,
      userId: currentPost.userId,
      topicId: userChoices.topicId,
    }
    updatePost(updatedPost).then(() => {
      navigate('/myposts')
    })
  }

  return currentUser.id != currentPost.userId ? (
    <>Wrong User</>
  ) : (
    <form className="edit-post-form">
      <h2>Edit Post</h2>
      <fieldset>
        <label>Topic : </label>
        <select value={userChoices.topicId} onChange={handleTopic}>
          <option hidden value={0}>
            Select Topic
          </option>
          {topics.map((topic) => {
            return (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            )
          })}
        </select>
      </fieldset>
      <fieldset>
        <label>Title : </label>
        <input type="text" value={userChoices.title} onChange={handleTitle} />
      </fieldset>
      <fieldset>
        <label>Body : </label>
        <input type="text" value={userChoices.body} onChange={handleBody} />
      </fieldset>
      <fieldset>
        <button onClick={handleSave}>Save Post</button>
      </fieldset>
    </form>
  )
}
