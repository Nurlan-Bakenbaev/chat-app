import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
const Search = () => {
  return (
    <div className='search'>
      <div className='searchForm'>
        <label htmlFor=""></label>
        <input type="text" placeholder='Search User' />
      </div>
      <div className='userChat'>
        <img src="https://images.pexels.com/photos/5971330/pexels-photo-5971330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="User-img" />
      <div className="userChatInfo">
        <span>Jane</span>
      </div>
      </div>
    </div>
  )
}

export default Search