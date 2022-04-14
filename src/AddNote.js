import React from 'react';
import { connect } from 'react-redux';
import { addNote } from './store';

class AddNote extends React.Component {
    constructor () {
        super();
        this.state = {
            note: '',
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange (ev) {
        this.setState({
         [ev.target.name]: ev.target.value,
        });
    }

    handleOnSubmit (ev) {
        ev.preventDefault();
        this.props.addToNotes(this.state.note);
        this.setState ({ note: ''});
    }

render () {
    const { note } = this.state;
    return (
        <div>
        <label htmlFor="note">Add a note:</label>
            <form name = "addnotes">
            <input 
            name="note"
            value={note}
            placeholder = "Add a note"

            onChange={(ev) => this.handleOnChange(ev)}
            />
            <button onClick = { this.handleOnSubmit }>Add</button>
            </form>
        </div>
    );
}
}

const mapDispatchToProps = (dispatch) => {
    return {
      addToNotes: (note) => {
        return dispatch(addNote(note));
      },
    };
  };
  
  export default connect(null, mapDispatchToProps)(AddNote);
