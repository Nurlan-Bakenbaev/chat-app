import React from 'react'
import DuoIcon from '@mui/icons-material/Duo';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Chat = () => {
  return (
    <div className='chat'>
<div className='chatInfo'>
  <span>Jane</span>
  <div className='chatIcons'>
    <DuoIcon/>
    <PersonAddIcon/>
    <MoreHorizIcon/>
  </div>
  <Me/>
</div>
    </div>
  )
}

export default Chat