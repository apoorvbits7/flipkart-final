import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <ul className="menuList">
                    <li className="menuItem"><NavLink exact to="/" activeClassName="active"><i class="fa fa-bar-chart" aria-hidden="true"></i>Analyze</NavLink></li>
                    <li className="menuItem"><NavLink to="/query" activeClassName="active"><i class="fa fa-search" aria-hidden="true"></i>Query</NavLink></li>
                    <li className="menuItem"><NavLink to="/chatbot" activeClassName="active"><i class="fa fa-comments-o" aria-hidden="true"></i>Chatbot</NavLink></li>
                </ul>
            </div>
        )
    }
}

export default Sidebar;