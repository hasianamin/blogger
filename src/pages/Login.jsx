import React, { useEffect, useState } from 'react';
import './style.css'
import {FormGroup,Form,Input,Label,Alert} from 'reactstrap'
import ButtonCustom from './../components/Button'
import { connect } from 'react-redux';
import {LoginFunc} from './../redux/actions'
import { Redirect } from 'react-router-dom';
const Login=(props)=>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState(null)

    const [visible, setVisible] = useState({
        username: false,
        password: false
    });

    useEffect(()=>{
        setUserData(props.User)
    },[])

    useEffect(()=>{
        // console.log(userData)
    })

    const onDismiss = (type) => {
        if(type) setVisible({...visible,username:false})
        else setVisible({...visible,password:false})
    }

    const onLoginClick=()=>{
        if(!username) {
            setVisible({...visible,username:true})
        }
        if(!password) {
            setVisible({...visible,password:true})
        }
        if(username && password) {
            let checkUser = userData.filter((val)=>{
                return username === val.username && password === val.password
            })
            if(checkUser.length){
                // console.log('benar')
                localStorage.setItem('username',username)
                props.LoginFunc({username:username,password:password})
            }
            else {
                setVisible({...visible,password:true})
                setVisible({...visible,username:true})
            }
        }
    }

    if(props.Auth.isLogin){
        return <Redirect to='/'/>
    }

    if(userData===null){
        return <div>Loading</div>
    }

    return (
        <div className='login-page'>
            <div className="login-container">
                <div className="login-title">
                    <h5>Let's Login here before you post</h5>
                </div>
                <div className="login-form">
                    <Form>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input type="text" onChange={e=>setUsername(e.target.value)}/>
                            <Alert isOpen={visible.username} toggle={()=>onDismiss(1)} color="danger mt-2">
                                Please input  valid username!
                            </Alert>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" onChange={e=>setPassword(e.target.value)}/>
                            <Alert isOpen={visible.password} toggle={()=>onDismiss(0)} color="danger mt-2">
                                Please input valid password!
                            </Alert>
                        </FormGroup>
                    </Form>
                    <div className="d-flex flex-row-reverse mt-3">
                        <ButtonCustom onClick={onLoginClick} btnType='btn-primary-custom'>Submit</ButtonCustom>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Mapstatetoprops=(state)=>{
    return{
        Auth:state.Auth,
        User:state.User
    }
}

export default connect(Mapstatetoprops,{LoginFunc})(Login)