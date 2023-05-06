import Card from "../components/Card";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import axios from "axios";
const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const { data } = await axios.get("http://localhost:5000/api/notes");
    setNotes(data);
    console.log(notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        sx={{ m: "1rem", mt: "20px", display: "flex" }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Create Note
      </Fab>
      {notes.map((note) => (
        <Card
          key={note._id}
          // title={note.title}
          // content={note.content}
          // id={note._id}
          {...note}
        />
      ))}
    </>
  );
};

export default MyNotes;
