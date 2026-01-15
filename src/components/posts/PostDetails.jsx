import {useParams} from "react-router-dom"
import {getPostById} from "../../services/posts.jsx"
import {useEffect, useState} from "react"

export const PostDetails = () => {
    const [currentPost, setCurrentPost] = useState({})
    const {postId} = useParams()

    useEffect(() => {
        getPostById(postId).then(setCurrentPost)
    }, [])

    //  Then the title, author, topic, date, body, and number of likes should display for the post.
    return(
        <div className="post-item">
            <h2 className="post-title">{currentPost.title}</h2>
            <p>{currentPost.user?.fullName}</p>
            <h3>{currentPost.topic?.name}</h3>
            <h4>{currentPost.date}</h4>
            <p>{currentPost.body}</p>
            <footer>
                {currentPost.postLikes?.length} likes
            </footer>
        </div>
    )
}
