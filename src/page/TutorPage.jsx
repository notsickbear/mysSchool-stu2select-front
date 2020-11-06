import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


export class TutorPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                {this.props.children}
                <div className="link">
                    <Link to={{
                        pathname: "/tutor/select",
                        state: {userId: this.props.userId}
                    }}>select</Link>
                </div>
                <div className="link">
                    <Link to={{
                        pathname: "/tutor/researchArea",
                        state: {userId: this.props.userId}
                    }}>researchArea</Link>
                </div>
                <div className="link">
                    <Link to={{
                        pathname: "/tutor/myStudent",
                        state: {userId: this.props.userId}
                    }}>myStudent</Link>
                </div>
            </div>
        )
    }
}

export default TutorPage