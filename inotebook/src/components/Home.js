import React from 'react';
import Notes from './Notes';

const Home = (props) => {
 
  const {showAlert} = props

  return (
    <div>
     {localStorage.getItem('token') ?
       <Notes showAlert={showAlert}></Notes> : <div> Login or Sign Up first </div>     
          }
    </div>
  )
}

export default Home
