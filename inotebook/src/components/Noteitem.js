import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import noteContext from '../context/notes/noteContext';



const Noteitem = (props) => {
     const context = useContext(noteContext);
     const {deleteNotes}= context;
    const {note,updateNote} = props

  return (
    <div>
      <Card sx={{ width: 250 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Note item
        </Typography>
        <Typography variant="h5" component="div">
        {note.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
       
        </Typography>
        <Typography variant="body2">
        {note.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
       <Button color="error" onClick={()=>{deleteNotes(note._id) ; props.showAlert("Deleted Successfully", "success")}}> <DeleteForeverIcon/></Button>
        <Button color="warning" onClick={()=>{updateNote(note) }}>  <EditIcon/> </Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default Noteitem
