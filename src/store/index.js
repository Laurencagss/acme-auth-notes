import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';



const notes = (state = [], action)=> {
  if(action.type === 'SET_NOTES'){
    return action.notes;
  }
  if(action.type === 'ADD_NOTE'){
    return [
      ...state, action.note
    ];
  }
if(action.type === 'DELETE_NOTE'){
  return state.filter(note => note.id !== action.noteId);
}
  return state;
};

const auth = (state = {}, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  return state;
};



const logout = ()=> {
  window.localStorage.removeItem('token');
  return {
    type: 'SET_AUTH',
    auth: {}
  };
};

const signIn = (credentials)=> {
  return async(dispatch)=> {
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    return dispatch(attemptLogin());
  }
};
const attemptLogin = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  }
}

const getNotes = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const notes = (
        await axios.get('/api/notes', {
          headers: {
            authorization: token
          }
        })
      ).data;
      dispatch({ type: 'SET_NOTES', notes });
    }
  }
};

const addNote = (note)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const res = (
        await axios.post('/api/notes', {
          text: note,
        authorization: token
        },
        {headers:{ authorization: token} }
      )).data;
      dispatch({ type: 'ADD_NOTE', note: { id: res.id, text: res.text } });
    }
  }
};

const deleteNote = (noteId)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      await axios.delete(`/api/notes/${noteId}`, {
        headers: {
          authorization: token,
        }
      });
      dispatch({ type: 'DELETE_NOTE', noteId });
    }
  }
};

const store = createStore(
  combineReducers({
    auth,
    notes
  }),
  applyMiddleware(thunk, logger)
);

export { attemptLogin, signIn, logout, getNotes, addNote, deleteNote };

export default store;
