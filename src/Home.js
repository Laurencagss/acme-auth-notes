import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotes, logout } from './store';
import { Link } from 'react-router-dom';

const Home = ({ auth, logout, notes})=> {
  useEffect(()=>{
   getNotes();
  }, []);

  if (!notes.length) {
  }
  
  return (
    <div>
      Welcome { auth.username }
      <button onClick={ logout }>Logout</button>
      <div>
        You have added { notes.length } notes.
        <br />
        <Link to='/notes'>Access and Add Notes</Link>
      </div>
    </div>
  );
};

const mapState = state => state;
const mapDispatch = (dispatch)=> {
  return {
    logout: ()=> {
      return dispatch(logout());
    },
    getNotes: ()=> {
      return dispatch(getNotes());
    }
  }
}


export default connect(mapState, mapDispatch)(Home);
