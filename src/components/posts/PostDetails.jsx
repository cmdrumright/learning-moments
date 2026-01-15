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
        <>post # {postId}</>
    )
}
