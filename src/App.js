import './css/App.css';
import {Link} from 'react-router-dom'
import React from "react";


export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                {this.props.children}
                <div className="link">
                    <Link to="/tutor">tutor</Link>
                </div>
                <div className="link">
                    <Link to="/student">student</Link>
                </div>
                <div className="link">
                    <Link to="/admin">admin</Link>
                </div>
                <div className="link">
                    <Link to="/login">login</Link>
                </div>
            </div>
        );
    }
}

