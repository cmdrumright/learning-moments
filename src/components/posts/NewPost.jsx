import {useEffect, useState} from "react"
import {getAllTopics} from "../../services/topics"
import {createPost} from "../../services/posts.jsx"
import {useNavigate} from "react-router-dom"

export const NewPost = ({currentUser}) => {
     const navigate = useNavigate()
    
    // get topics
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getAllTopics().then(setTopics)
    },[])

    // save user choices
    const [userChoices, setUserChoices] = useState({
        title: "",
        body: "",
        topicId: 0
    })

    const handleTopic = (e) => {
        const copy = {...userChoices}
        copy.topicId = parseInt(e.target.value)
        setUserChoices(copy)
    }

    const handleTitle = (e) => {
        const copy = {...userChoices}
        copy.title = e.target.value
        setUserChoices(copy)
    }

    const handleBody = (e) => {
        const copy = {...userChoices}
        copy.body = e.target.value
        setUserChoices(copy)
    }

    // create post
    const handleSave = (e) => {
        e.preventDefault()
        let allSelected = true
        if ( userChoices.title === "" ) {
            allSelected = false
            alert("Please add a title")
        }
        if ( userChoices.body === "" ) {
            allSelected = false
            alert("Please add a body")
        }
        if ( userChoices.topicId === 0 ) {
            allSelected = false
            alert("Please select a topic")
        }
        if (allSelected) {
            const newPostObj = {
                title: userChoices.title,
                body: userChoices.body,
                date: new Date(),
                userId: currentUser.id,
                topicId: userChoices.topicId
            }
            createPost(newPostObj).then(() => {
                navigate("/myposts")
            })
        }
    }

    return (
        <form className="new-post-form">
            <h2>New Post</h2>
            <fieldset>
                <label>Topic : </label>
                <select value={userChoices.topicId} onChange={handleTopic}>
                    <option hidden value={0}>Select Topic</option>
                    {topics.map((topic) => {
                        return (
                            <option key={topic.id} value={topic.id}>{topic.name}</option>
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
