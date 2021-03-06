import React, { Component } from 'react'
import Cell from './Cell/Cell';

import './gol.css';
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// import PanZoom from "react-easy-panzoom"

const SIZE_W = 40
const SIZE_H = 40

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

        const newCell = { ...myCell, status: newStatus };

        myGrid[i][j] = newCell;
        this.setState({ grid: myGrid })
    }

    mouseDown(i, j) {
        console.log("down")
        this.setState({ mouseDown: true });
        this.updateGrid(i, j);
    }

    mouseEnter(i, j) {
        console.log("enter " + i, j)
        if (!this.state.mouseDown) return;
        this.updateGrid(i, j);
    }

    mouseUp() {
        this.setState({ mouseDown: false });
    }


    changeClickMode(curMode) {
        this.setState({ clickMode: curMode === "life" ? "wall" : "life" });
        document.getElementById("click-mode-button").innerText = curMode === "life" ? "wall" : "life";
    }

    setFps() {
        let newFPS = document.getElementById("fps-input").value;
        if (isNaN(newFPS)) newFPS = 1;
        this.setState({ fps: newFPS });

        const animationSpeed = 0.2 + (1 / newFPS) * 0.8;
        const visited = document.querySelectorAll(".visited,.alive");//.style["animation-duration"] = toString(animationSpeed) + "s";
        visited.forEach(each => {
            each.style["animation-duration"] = toString(animationSpeed) + "s";
        })
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
                myState = myState === "unchanged" ? cell.status : myState === "alive" ? "alive" : "empty";
                let myVisited = cell.visited || (cell.status === "alive" && myState === "empty")
                const _newCell = newCell(row_i, cell_j, myState, myVisited);
                newRow[cell_j] = _newCell;
                return;
            });
            nextFrame[row_i] = newRow;
            return;
        });

        return nextFrame
    }

    setPlay(curPlaying) {
        this.setState({ playing: !curPlaying });
        setTimeout(this.play.bind(this), 1000 / this.state.fps);
        document.getElementById("play-button").innerText = curPlaying ? "play" : "pause";
    }

    play() {
        if (!this.state.playing) {
            return;
        }
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

                <div className="grid" onMouseUp={() => this.mouseUp()}>

                    {grid.map((row, row_i) => {
                        return (
                            <div key={row_i} onMouseUp={() => this.mouseUp()}>
                                {row.map((cell, col_j) => {
                                    const { j, i, status, visited } = cell;
                                    return (
                                        <Cell key={col_j}
                                            j={j}
                                            i={i}
                                            status={status}
                                            visited={visited}
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
            row.push(newCell(i, j));
        }
        grid.push(row);
    }
    return grid;
};

// i -> y, j -> x
const newCell = (i, j, status = "empty", visited = false) => {
    const myCell = {
        j: j,
        i: i,
        status: status,
        visited: visited,
    };
    return myCell;
};





