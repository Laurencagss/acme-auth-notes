import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddNote from './AddNote';
import { deleteNote } from './store';

const Notes = ({ creds, notes, deleteNote })=> {
  return (
    <div>
      <Link to='/home'>Home</Link>
      <div>
      Here are your notes:
      </div>
      <ol>
          {notes.map((note) => (
            <li key={note.id}>
              {note.text}
              <button onClick={() => deleteNote(note.id)}>delete</button>
            </li>
          ))}
        </ol>
    <div>
    <AddNote />
    </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(deleteNote(id)),
});

export default connect((state)=> state, mapDispatchToProps)(Notes);
