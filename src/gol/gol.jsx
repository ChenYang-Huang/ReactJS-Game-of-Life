import React, { Component } from 'react'
import Cell from './Cell/Cell';

import './gol.css';


const SIZE_W = 30
const SIZE_H = 30

/*  enumerate([
        "life",
        "wall",
        "shape",
        ...
    "])
*/
// var clickMode = "life";

export default class Gol extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            clickMode: "life",
            mouseDown: false,
            playing: false,
            fps: 1,

        };
    }
    componentDidMount() {
        const grid = makeGrid();
        this.setState({ grid });
    }

    clear() {
        const grid = makeGrid();
        this.setState({ grid });
    }
    updateGrid = (i, j) => {
        // console.log(this.state.grid[3])
        const myGrid = this.state.grid.slice();
        const myCell = myGrid[i][j];
        var newStatus;
        switch (this.state.clickMode) {
            case "life":
                newStatus = myCell.status === "alive" ? "empty" : "alive";
                break;
            case "wall":
                newStatus = myCell.status === "blocked" ? "empty" : "blocked";
                break;
            default:
        }

        // console.log("harsetianrositenars")
        // console.log(i, j)
        // console.log(myGrid[i])
        const newCell = { ...myCell, status: newStatus };

        myGrid[i][j] = newCell;
        // console.log(i, j)
        this.setState({ grid: myGrid })
    }

    mouseDown(i, j) {
        // console.log("ahha!")
        this.setState({ mouseDown: true });
        // console.log(i);
        this.updateGrid(i, j);
        console.log(this.state.grid[i][j])
    }

    mouseEnter(i, j) {
        // console.log(i, j);
        if (!this.state.mouseDown) return;
        this.updateGrid(i, j);
    }

    mouseUp() {
        this.setState({ mouseDown: false });
    }


    changeClickMode(curMode) {
        // console.log(this.state.clickMode)
        this.setState({ clickMode: curMode === "life" ? "wall" : "life" });
        document.getElementById("click-mode-button").innerText = curMode === "life" ? "wall" : "life";
    }

    setFps() {
        let newFPS = document.getElementById("fps-input").value;
        if (isNaN(newFPS)) newFPS = 1;
        this.setState({ fps: newFPS });
        console.log(this.state.fps);
    }

    /*
     * Any live cell with fewer than two live neighbours dies, as if by underpopulation.
     * Any live cell with two or three live neighbours lives on to the next generation.
     * Any live cell with more than three live neighbours dies, as if by overpopulation.
     * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     */
    getNextFrame() {
        const myGrid = this.state.grid.slice();
        const nextFrame = []

        myGrid.map((row, row_i) => {
            const newRow = []
            row.map((cell, cell_j) => {
                var liveNeighbors = 0;
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if ((i === 0 && j === 0) || row_i + i < 0 || cell_j + j < 0 || row_i + i >= SIZE_H || cell_j + j >= SIZE_W)
                            continue;
                        if (myGrid[row_i + i][cell_j + j].status === "alive")
                            liveNeighbors++;
                    }
                }
                var myState = liveNeighbors > 3 ? "dead" : liveNeighbors > 2 ? "alive" : liveNeighbors > 1 ? "unchanged" : "dead";
                myState = myState === "unchanged" ? cell.status : myState === "alive" ? "alive" : cell.visited ? "visited" : "empty";

                const _newCell = newCell(row_i, cell_j, myState);
                newRow[cell_j] = _newCell;
                return;
            });
            nextFrame[row_i] = newRow;
            return;
        });

        return nextFrame
    }

    setPlay(curPlaying) {
        console.log(this.state.playing)
        this.setState({ playing: !curPlaying });
        setTimeout(this.play.bind(this), 1000 / this.state.fps);
        document.getElementById("play-button").innerText = curPlaying ? "play" : "pause";
    }

    play() {
        console.log("loop")
        console.log(this);
        if (!this.state.playing) {
            console.log("no!")
            return;
        }
        console.log("loop2")

        const nextFrame = this.getNextFrame();
        this.setState({ grid: nextFrame });

        setTimeout(this.play.bind(this), 1000 / this.state.fps);
    }
    render() {
        const { grid } = this.state;
        return (
            <React.Fragment>
                <button id="play-button" onClick={() => this.setPlay(this.state.playing)}>
                    play
                </button>
                <button id="click-mode-button" onClick={() => this.changeClickMode(this.state.clickMode)}>
                    life
                </button>
                <button id="clear-button" onClick={() => this.clear()}>
                    clear
                </button>
                <input type="number" id="fps-input" />
                <button id="set-fps-button" onClick={() => this.setFps()}>
                    fps
                </button>

                <div className="grid">

                    {grid.map((row, row_i) => {
                        return (
                            <div key={row_i}>
                                {row.map((cell, col_j) => {
                                    const { j, i, status, visited } = cell;
                                    // console.log(cell)
                                    return (
                                        <Cell key={col_j}
                                            j={j}
                                            i={i}
                                            status={status}
                                            visited={visited}

                                            // mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(i, j) => this.mouseDown(i, j)}
                                            onMouseEnter={(i, j) =>
                                                this.mouseEnter(i, j)
                                            }
                                            onMouseUp={() => this.mouseUp()}

                                        ></Cell>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </React.Fragment >
        );
    }
}




const makeGrid = () => {
    const grid = [];
    for (let i = 0; i < SIZE_H; i++) {
        const row = [];
        for (let j = 0; j < SIZE_W; j++) {
            // console.log(i + ":" + j)
            row.push(newCell(i, j));
        }
        grid.push(row);
    }
    return grid;
};

// i -> y, j -> x
const newCell = (i, j, status = "empty") => {
    // console.log(i_ + " " + j_)
    const myCell = {
        j: j,
        i: i,
        status: status,
        // alive: false,
        visited: false,
        // blocked: false,
    };
    return myCell;
};





