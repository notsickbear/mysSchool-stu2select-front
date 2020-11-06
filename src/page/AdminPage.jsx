import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


export class StudentPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                {this.props.children}
                <div className="link">
                    <Link to={{
                        pathname: "/admin/assign",
                        state: {userId: this.props.userId}
                    }}>assign</Link>
                </div>
                <div className="link">
                    <Link to={{
                        pathname: "/admin/setNumLimit",
                        state: {userId: this.props.userId}
                    }}>setNumLimit</Link>
                </div>
            </div>
        )
    }
}

export default StudentPage