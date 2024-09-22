import React from 'react'
import "./Search.css"

import Dropdown from './Dropdown'

const Search = () => {

  const login = () => {
    console.log("User wants to log in");
  }  


  return (
    <div className='Search'>
        <div className='Subject'>
          <Dropdown topics={["COMPSCI", "MATH", "ENGL"]} initialTopic="Subjects"/>
        </div>
        <div className='Time Conflict Enrollment'>
          <Dropdown topics={["Allow Time Conflict Enrollment", "Don't allow Time Conflict Enrollment"]} initialTopic="Allow Time Conflict Enrollment"/>
        </div>
        <div className='Waitlist Level'>
          <Dropdown topics={["No Waitlist", "<= 10% Waitlist", "Any Waitlist"]} initialTopic="No Waitlist"/>
        </div>
    </div>
  )
}

export default Search