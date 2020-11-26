import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {LoginFunc} from './redux/actions'

function App(props) {

  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    let getUsername = localStorage.getItem('username')
    if(getUsername){
      props.LoginFunc({username:getUsername})
      setLoading(false)
    } else {
      setLoading(false)
    }
  },[])

  if(loading){
    return (
      <div>Loading</div>
    )
  }

  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

const Mapstatetoprops=(state)=>{
  return{
      Auth:state.Auth,
      User:state.User
  }
}

export default connect(Mapstatetoprops,{LoginFunc})(App);
