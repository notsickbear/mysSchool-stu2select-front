import React, {Component} from 'react'

export class Table extends Component {
    handlePageClick = (page) => {
        this.props.getTableDate(page)
    }

    render() {
        var pageDiv = []
        // i要用let才能成功
        for (let i = 1; i <= this.props.totalPages; i++) {
            pageDiv.push(<p className='page' key={i} onClick={() => this.handlePageClick(i - 1)}>{i}</p>)
        }

        return (
            <div className='table'>
                <table>
                    <thead>
                    {this.props.thead.length <= 0 ? <tr>
                        <td></td>
                    </tr> : this.props.thead}
                    </thead>
                    <tbody>
                    {this.props.tbody.length <= 0 ? <tr>
                        <td></td>
                    </tr> : this.props.tbody}
                    </tbody>
                </table>
                <div>
                    {pageDiv}
                </div>
            </div>
        )
    }
}

export default Table
