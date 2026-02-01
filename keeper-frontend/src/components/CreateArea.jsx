import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom, CircularProgress } from "@mui/material";
import "../CSS/CreateArea.css";

function CreateArea({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote(event) {
    event.preventDefault();
    
    // Validation
    if (!note.title.trim() || !note.content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    setIsSubmitting(true);

    try {
      onAdd(note);
      
      // Reset form
      setNote({
        title: "",
        content: "",
      });
      setExpanded(false);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div className="create-area-container">
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoFocus
            disabled={isSubmitting}
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          disabled={isSubmitting}
        />

        <Zoom in={isExpanded}>
          <Fab 
            type="submit" 
            disabled={isSubmitting}
            className="add-button"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <AddIcon />
            )}
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
