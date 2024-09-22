import React from 'react'
import MajorsList from './MajorsList'

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';





// Example usage
const majors = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"];



const Settings = () => {
  return (
    <div className="Settings">
      <div className="Options-Bar">
        <div className='Google-Calendars'>
          <AddLocationAltIcon />
        </div>
        <div className='Friends-Calendars'>
          <GroupIcon />
        </div>
        <div className='Track-Favorites'>
          <FavoriteIcon />
        </div>
      </div>
      <div className="Remaining_Classes">
        <div className='Majors'>
          <MajorsList majors={majors} />
        </div>
        <div className='Breadths'>

        </div>
      </div>
      <div className="Calendar">

      </div>
    </div>
  )
}

export default Settings