import React, { useState } from 'react'
import "./Dropdown.css"

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Dropdown = ({topics, initialTopic}) => {

    const [topicInput, setTopicInput] = useState(initialTopic);
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        setIsOpen(!isOpen);
    }

    const searchForTopic = (e) => {
        e.preventDefault()
        setTopicInput(e.target.value)
        // search from list of topics.
    } 
    
  return (
    <div className="Dropdown">
        <div className="Dropdown__body" onClick={toggleOpen}>
            <input className = "topic" type="text" placeholder={initialTopic} required onChange={searchForTopic}/>
            <div className="Dropdown__arrow">
                { isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
        </div>
        {isOpen && (
            <div className="Dropdown__list">
                {topics.map((topic, index) => (
                    <div key={index} className="Dropdown__list-item">
                        {topic}
                    </div>
                ))}
            </div>
        )}
        
    </div>
  )
}

export default Dropdown