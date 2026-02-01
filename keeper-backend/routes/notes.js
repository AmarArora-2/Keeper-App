import express from 'express';
import db from "../config/PostgreSQLDB.js";
import authenticate from '../MiddlewareAuth.js';

const router = express.Router();

// Get all notes for authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',[req.user.id]);
    
    res.json({ notes: result.rows });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Create new note
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const result = await db.query(
      'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, title, content]
    );
    
    res.status(201).json({ note: result.rows[0], message: 'Note created successfully' });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Update note
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    // Verify ownership
    const checkOwnership = await db.query(
      'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (checkOwnership.rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized to update this note' });
    }
    
    const result = await db.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, content, id, req.user.id]
    );
    
    res.json({ note: result.rows[0], message: 'Note updated successfully' });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete note
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify ownership
    const checkOwnership = await db.query(
      'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (checkOwnership.rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized to delete this note' });
    }
    
    await db.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;
