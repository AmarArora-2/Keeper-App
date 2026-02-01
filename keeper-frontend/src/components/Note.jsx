import React, { useState, useRef, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import "../CSS/Note.css";

function Note({ id, title, content, onDelete, onUpdate, createdAt }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ title, content });
  const [deleteProgress, setDeleteProgress] = useState(0);
  const deleteIntervalRef = useRef(null);
  const vibratedAt50 = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (deleteIntervalRef.current) {
        clearInterval(deleteIntervalRef.current);
      }
    };
  }, []);

  function handleDeleteStart() {
    setDeleteProgress(0);
    vibratedAt50.current = false;
    
    // ✅ 1. Light vibration when user starts holding (10ms)
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    // Update progress every 20ms
    deleteIntervalRef.current = setInterval(() => {
      setDeleteProgress(prev => {
        const newProgress = prev + 2;

        if (newProgress >= 50 && !vibratedAt50.current) {
          vibratedAt50.current = true;
          if ('vibrate' in navigator) {
            navigator.vibrate(25);
          }
        }
        
        if (newProgress >= 100) {
          clearInterval(deleteIntervalRef.current);
          return 100;
        }
        
        return newProgress;
      });
    }, 20);
  }

 function handleDeleteEnd() {
    if (deleteIntervalRef.current) {
      clearInterval(deleteIntervalRef.current);
    }

    if (deleteProgress > 0 && deleteProgress < 100) {
      if ('vibrate' in navigator) {
        navigator.vibrate(5);
      }
    }
    setDeleteProgress(0);
  }

  // Use useEffect to trigger delete when progress reaches 100%
  useEffect(() => {
    if (deleteProgress >= 100) {

      // ✅ 4. Strong vibration pattern when delete completes (50ms, pause, 50ms)
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 30, 50]);
      }

      // Small delay to ensure clean state update
      const timer = setTimeout(() => {
        onDelete(id);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [deleteProgress, id, onDelete]);

  function handleEdit() {
    // ✅ 5. Light tap when entering edit mode (15ms)
    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
    setIsEditing(true);
  }

  function handleCancel() {
    // ✅ 6. Light tap when canceling edit (10ms)
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    setIsEditing(false);
    setEditedNote({ title, content });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote(prev => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    if (!editedNote.title.trim() || !editedNote.content.trim()) {
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 50, 50]);
      }
      return;
    }
    try {
      // ✅ 8. Success vibration when save starts (20ms)
      if ('vibrate' in navigator) {
        navigator.vibrate(20);
      }
      await onUpdate(id, editedNote);
      setIsEditing(false);
       // ✅ 9. Success vibration pattern (30ms, pause, 20ms)
      if ('vibrate' in navigator) {
        navigator.vibrate([30, 50, 20]);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      // ✅ 10. Error vibration pattern (long-short-long)
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 50, 50, 100]);
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="note">
      {!isEditing ? (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          {createdAt && <span className="note-date">{formatDate(createdAt)}</span>}
          <div className="note-actions">
            <button onClick={handleEdit} className="edit-btn">
              <EditIcon />
            </button>
            <button 
              onMouseDown={handleDeleteStart}
              onMouseUp={handleDeleteEnd}
              onMouseLeave={handleDeleteEnd}
              onTouchStart={handleDeleteStart}
              onTouchEnd={handleDeleteEnd}
              className="delete-btn hold-to-delete"
              title="Hold to delete"
            >
              <DeleteIcon />
              {deleteProgress > 0 && (
                <div 
                  className="delete-progress" 
                  style={{ width: `${deleteProgress}%`, background: deleteProgress > 50 ? '#ff0000' : '#ff6666'  }}
                />
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            placeholder="Title"
            className="edit-title"
          />
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            placeholder="Content"
            rows="5"
            className="edit-content"
          />
          <div className="note-actions">
            <button onClick={handleSave} className="save-btn">
              <SaveIcon />
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              <CancelIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
