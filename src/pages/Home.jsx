import React, { useEffect, useState } from 'react';
import './style.css'
import {Link, Redirect} from 'react-router-dom'
import Header from '../components/Header';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ButtonCustom from '../components/Button';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form,
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';
import { connect } from 'react-redux';

const Home=(props)=>{

    const [toggle,setToggle] = useState(false)
    const [data,setData] = useState([
        {
            username: 'Susan Doe',
            photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            title: '9 Places To Stay in Tokyo Where Tradition and Modernity Meet',
            date: '7 August 2019',
            image: 'https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2019/07/cfbxca.jpg',
            content: 'The city of Tokyo combines old-world sensibilities and modernity unlike any place on earth. The city (and Japan in general) is a grand dichotomy of cultural traditions mixed with mind-bending technology. Finding a hotel in this vast expanse can be overwhelming, so local experts at Culture Trip have hand-selected some of the city’s best places to stay to showcase Japan’s past, present and future.',
            category: 'travel'
        },
        {
            username: 'Amy Blyth',
            photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            title: 'The Best Hotels in St Anton, Austria',
            date: '14 October 2020',
            image: 'https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2020/10/st--anton-am-arlberg-austria-e1602595458489.jpg',
            content: 'St Anton is known as the birthplace of alpine skiing, with more than 300km (186mi) of slopes that are reliably blanketed with snow from November to April. The town itself, once a quiet mountain haven in Austria’s Arlberg region, now boasts a heady après-ski party scene and some of the best Tyrolean lodges and resorts in the area.',
            category: 'travel'
        },
        {
            username: 'Jane Doe',
            photo: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&auto=format&fit=crop&w=651&q=80',
            title: '11 Places To Stay in Paris That Are Perfect for Foodies',
            date: '7 August 2019',
            image: 'https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2019/07/off-paris-seine8.jpg',
            content: 'French food culture runs deeper than croissants and steak frites, and picking the right place to stay can make or break a culinary adventure in Paris. Culture Trip experts have curated these hotels and hostels so you won’t just discover classic brasseries and tourist haunts, but neighbourhood neo-bistros, traditional traiteurs and no-frills Michelin-star restaurants.',
            category: 'food'
        }
    ])

    const [inputStory,setInputStory] = useState({
        username:'',
        title: '',
        image: '',
        story: '',
        date: '',
        photo: '',
        content: ''
    })

    const onSubmitStory=()=>{
        let getPhoto = data.filter((val)=>{
            return props.Auth.username === val.username
        })
        if(inputStory.image === "" || inputStory.image.toLowerCase().indexOf("http") === -1 || inputStory.image.toLowerCase().indexOf("https") === -1){
            inputStory.image = "https://i2.wp.com/saintif.com/wp-content/uploads/2020/08/gambar-pemandangan-yang-indah.png?fit=1600%2C1200&ssl=1"
        }
        let now = new Date()
        inputStory.username = props.Auth.username
        inputStory.photo = getPhoto[0].photo
        inputStory.date = now.toString()
        data.unshift(inputStory)
        setToggle(false)
        setInputStory({
            username:'',
            title: '',
            image: '',
            story: '',
            date: '',
            photo: '',
            content: ''
        })
    }

    useEffect(()=>{
        console.log(inputStory)
    })

    return (
        <div>
            <Header/>
            <div className="home">
                <div className="home-container">
                    <div className="home-title">
                        <h4>Your Timeline</h4>
                        <ButtonCustom btnType='btn-primary-custom' onClick={()=>setToggle(!toggle)}>
                        <FontAwesomeIcon icon={faEdit} /> Write your own?
                        </ButtonCustom>
                    </div>
                    <div className="articles">
                        <Card data={data} user={props.Auth.username}/>
                    </div>
                </div>
            </div>
            <Modal isOpen={toggle} toggle={()=>setToggle(false)}>
                {
                    props.Auth.isLogin?
                    <>
                        <ModalHeader toggle={()=>setToggle(false)}>Write your story</ModalHeader>
                        <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input onChange={e=>setInputStory({...inputStory,title:e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Image</Label>
                                <Input onChange={e=>setInputStory({...inputStory,image:e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Story</Label>
                                <Input onChange={e=>setInputStory({...inputStory,content:e.target.value})} type="textarea" style={{height:'200px'}}/>
                            </FormGroup>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={onSubmitStory}>Submit</Button>{' '}
                        <Button color="secondary" onClick={()=>setToggle(false)}>Cancel</Button>
                        </ModalFooter>
                    </>
                    :
                    <Redirect to='/login'/>
                }
            </Modal>
        </div>
    )
}

const Mapstatetoprops=(state)=>{
  return{
      Auth:state.Auth,
      User:state.User
  }
}

export default connect(Mapstatetoprops)(Home)