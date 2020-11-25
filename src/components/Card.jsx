import React from 'react';
import './../pages/style.css'

const Card=(props)=>{

    const renderCard=()=>{
        return props.data.map((val,index)=>{
            return (
                <div className='card-container' key={index}>
                    <div className="card-header">
                        <div className="card-image">
                            <img src={val.image} alt=""/>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-upper">
                            <div className="card-left">
                                <img src={val.photo} alt=""/>
                            </div>
                            <div className="card-right">
                                <div className="card-user">
                                    <p>{val.username}</p>
                                </div>
                                <div className="card-date">
                                    <p>{val.date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-lower">
                            <div className="card-title">
                                <h4>{val.title}</h4>
                            </div>
                            <div className="card-content">
                                <p>{val.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <>
            {renderCard()}
        </>
    )
}

export default Card