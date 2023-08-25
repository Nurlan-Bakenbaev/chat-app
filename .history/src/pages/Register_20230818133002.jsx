import React from 'react'

const Register = () => {
  return (
    <div className='formContainer'>
  <div className='formWrapper'>
    <h2 className='logo'>Chat App</h2>
    <span className='title'> Register form</span>
<form>
    <input type="text"placeholder='text' />
    <input type="email" placeholder='email'/>
    <input type="password"placeholder='password' />
    <input type="file"placeholder='' />
</form>
</div>
    </div>
  )
}

export default Register