import React, { Component } from 'react'

import './Cell.css';


export default class Cell extends Component {

    render() {
        const {
            j,
            i,
            status,
            visited,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            // onMouseHover
        } = this.props;

        // console.log(this.props)

        return (
            <div id={`cell-${i}-${j}`}
                className={'cell-container' + (visited ? ' visited-container' : '')}
                onMouseDown={() => onMouseDown(i, j)}
                onMouseUp={() => onMouseUp()}
                onMouseEnter={() => onMouseEnter(i, j)}
            // onMouseHover={onMouseHover}
            ><div
                className={`cell ${status}` + (visited ? ' visited' : '')}>
                </div>
            </div >
        );
    }
}

