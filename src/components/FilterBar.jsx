import {useState} from "react"
import {getAllTopics} from "../services/topics.jsx"
import {useEffect} from "react"

export const FilterBar = ({setFilterTopic, setSearchTerm}) => {
    const [allTopics, setAllTopics] = useState([])
    //get list of topics
    useEffect(() => {
        getAllTopics().then((topics) => {
            setAllTopics(topics)
        })
    }, [])

    //setTopic if topic selected
    const topicChange = (e) => {
        setFilterTopic(+e.target.value)
    }

    //show topic selection box
    return (
        <div>
            <label for="topic">Filter Topic</label>
            <select name="topic" id="topic" onChange={topicChange}>
                <option selected value={0} >All</option>
            {allTopics.map((topic) => {
                return (
                    <option value={topic.id}>{topic.name}</option>
                )
            })}
            </select>
            <input type="text" onChange={(event) => {
                setSearchTerm(event.target.value)
            }}></input>
        </div>
    )
}
