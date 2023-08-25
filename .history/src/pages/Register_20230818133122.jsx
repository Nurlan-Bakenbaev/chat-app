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
    <button>Sign Up</button>
</form>
<p>Do you have an account? <span> Login</span> </p>
</div>
    </div>
  )
}

export default Register