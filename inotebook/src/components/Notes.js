import React, { useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import AddNotes from "./AddNote";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Notes = (props) => {

  const { showAlert } = props;
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,editNotes } = context;
  const [note, setNote] = React.useState({   id: "", title: "",  description: "",   tag: "",  });
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/");
    }
  }, []);

  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ref = useRef(null);
  
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      title: currentnote.title,
      description: currentnote.description,
      tag: currentnote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault(); 
    editNotes(note.id, note.title, note.description, note.tag);
    setOpen(false);
    props.showAlert("Updated Sucessfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes showAlert={showAlert}></AddNotes>
      <div style={{ display: "flex" }}>
        <h2> Your Notes </h2>

        <div>
          <Button style={{ display: "none" }} ref={ref} onClick={handleOpen}>
            Open modal
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Notes
              </Typography>
              <Box
                style={{ display: "flex", flexDirection: "column" }}
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "40ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  variant="outlined"
                  value={note.title}
                  minLength={5}
                  onChange={onChange}
                  required
                />
                <TextField
                  id="description"
                  label="Description"
                  name="description"
                  value={note.description}
                  variant="outlined"
                  minLength={5}
                  onChange={onChange}
                  required
                />
                <TextField
                  id="tag"
                  label="Tag"
                  name="tag"
                  onChange={onChange}
                  value={note.tag}
                  variant="outlined"
                />
              </Box>
              <Button
                disabled={note.title.length < 5 || note.description.length < 5}
                onClick={handleClick}
              >
                Save Notes
              </Button>
            </Box>
          </Modal>
        </div>

        {notes.length === 0 && "No notes to display"}
        {notes.map((notes) => {
          return (
            <Noteitem
              key={notes._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={notes}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
