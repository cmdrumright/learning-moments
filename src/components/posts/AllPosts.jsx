import {useEffect, useState} from "react"
import {getAllPosts} from "../../services/posts.jsx"
import {FilterBar} from "../FilterBar.jsx"
import "./Posts.css"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [filterTopic, setFilterTopic] = useState(0)
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchedPosts, setSearchedPosts] = useState([])

    useEffect(() => {
        getAllPosts().then((postArray) => {
            setAllPosts(postArray)
        })
    }, [])

    useEffect(() => {
        const foundPosts = allPosts.filter((post) => filterTopic ? post.topic.id === filterTopic : true)
        setFilteredPosts(foundPosts)
    }, [filterTopic, allPosts])

    useEffect(() => {
        if (searchTerm === "") {
            setSearchedPosts(filteredPosts)
        } else {
            const foundPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchedPosts(foundPosts)
        }
    }, [filteredPosts, searchTerm])

    return (<>
        <FilterBar setFilterTopic={setFilterTopic} setSearchTerm={setSearchTerm}/>
        <div className="all-post-container">
            {searchedPosts.map((post) => {
                return (
                    <div className="post-item" key={post.id}>
                        <h2>Title</h2>
                        <p>{post.title}</p>
                        <h2>Topic</h2>
                        <p>{post.topic.name}</p>
                        <h2>Likes</h2>
                        <p>{post.postLikes.length}</p>
                    </div>
                )
            })}
        </div>
    </>)
}
