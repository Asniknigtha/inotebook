import React, {useState} from 'react'
import { Grid,Paper,  TextField, Button} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
const Signup=(props)=>{
  const [credentials, setCredentials] = useState({ name: "",email: "", password: "", cPass: "",}) 
    
  let navigate = useNavigate()
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const formStyle ={marginBottom:"15px"}
    const btnstyle={margin:'8px 0'}
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const response = await fetch (`http://localhost:5000/api/auth/createuser`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({ name : credentials.name,email : credentials.email, password : credentials.password })      
      });

      const json =  await response.json()
      console.log(json);
      //console.log(json.status);
      if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken); 
          navigate("/");
          props.showAlert("Account Created Sucessfully", "success")
      }
      else{
         
          props.showAlert("Invalid Details", "error")
      }
    }
    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

    return(
      <form onSubmit={handleSubmit} >
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField style={formStyle} label='Name' placeholder='Enter Name' value={credentials.name} onChange={onChange} name="name" variant="outlined"  fullWidth required/>
                <TextField style={formStyle} label='Username' placeholder='Enter username' value={credentials.email} onChange={onChange} name="email" variant="outlined"  fullWidth required/>
                <TextField style={formStyle}  label='Password' placeholder='Enter password' type='password'  value={credentials.password} onChange={onChange} name="password" variant="outlined" minLength={5} fullWidth required/>
                <TextField label='Confirm Password' placeholder='Confirm Password' value={credentials.cPass} onChange={onChange} name="cPass" variant="outlined" minLength={5} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth >Sign Up</Button>
            </Paper>
        </Grid>
        </form>
    )
}

export default Signup