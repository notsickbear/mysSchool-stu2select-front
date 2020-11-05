import React, { Component } from 'react'

export class Table extends Component {

    render() {
        return (
            <div className='table'>
                <table>
                    <thead>{this.props.thead}</thead>
                    <tbody>
                        {this.props.tbody.length <= 0 || this.props.tbody.length > 3 ? <tr><td/></tr> : this.props.tbody}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table
