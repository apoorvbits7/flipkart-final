import React from 'react';
import './Navbar.css';
import profilePic from '../../assets/img/profilePic.jpg'

class Navbar extends React.Component {
    render() {
        return (
            <div className="Navbar">
                <span className="title">bitskrieg<span style={{ fontWeight: '500' }}>2.0</span></span>
                <img src={profilePic} className="profilePic" />
            </div>
        )
    }
}

export default Navbar;