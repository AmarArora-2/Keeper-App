import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { notesAPI } from "../services/api";
import { TransitionGroup } from "react-transition-group";
import Grow from "@mui/material/Grow";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import "../CSS/NotesPage.css";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      setLoading(true);
      setError(null);
      const response = await notesAPI.getAllNotes();
      setNotes(response.data.notes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function addNote(newNote) {
    try {
      const response = await notesAPI.createNote(newNote);
      setNotes((prevNotes) => [response.data.note, ...prevNotes]);
      showSnackbar("Note created successfully!", "success");
      return response.data.note;
    } catch (err) {
      console.error("Error creating note:", err);
      showSnackbar("Failed to create note", "error");
      throw err;
    }
  }

  async function updateNote(id, updatedNote) {
    try {
      const response = await notesAPI.updateNote(id, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? response.data.note : note
        )
      );
      showSnackbar("Note updated successfully!", "success");
    } catch (err) {
      console.error("Error updating note:", err);
      showSnackbar("Failed to update note", "error");
      throw err;
    }
  }

  async function deleteNote(id) {
    try {
      // Remove from state immediately (triggers animation)
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      
      // Call API in background
      await notesAPI.deleteNote(id);
      
      showSnackbar("Note deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting note:", err);
      showSnackbar("Failed to delete note", "error");
      // Restore notes if API fails
      fetchNotes();
    }
  }

  function showSnackbar(message, severity) {
    setSnackbar({ open: true, message, severity });
  }

  function handleCloseSnackbar() {
    setSnackbar({ ...snackbar, open: false });
  }

  return (
    <div className="notes-page">
      <Header />
      <CreateArea onAdd={addNote} />

      {loading ? (
        <div className="loading-container">
          <CircularProgress sx={{ color: '#f5ba13' }} />
          <p>Loading your notes...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <h2>No notes yet</h2>
          <p>Start creating your first note above!</p>
        </div>
      ) : (
        <TransitionGroup className="notes-grid">
          {notes.map((noteItem) => (
            <Grow 
              key={noteItem.id} 
              timeout={800}
            >
              <div className="note-wrapper">
                <Note
                  id={noteItem.id}
                  title={noteItem.title}
                  content={noteItem.content}
                  createdAt={noteItem.createdAt}
                  onDelete={deleteNote}
                  onUpdate={updateNote}
                />
              </div>
            </Grow>
          ))}
        </TransitionGroup>
      )}

      <Footer />

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default NotesPage;
