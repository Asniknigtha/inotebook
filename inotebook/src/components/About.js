import React,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes'


const About = () => {
  const a = useContext(noteContext)
  
  useEffect(()=>{

    a.update();

  },[])


  return (
    <div>
      This is about {a.state.name} who studies in class {a.state.class}

      {/* <Notes></Notes> */}
    </div>
  )
}

export default About
