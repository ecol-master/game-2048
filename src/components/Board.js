import React, {useState, useEffect} from "react";
import Tile from "./Tile";
import Cell from "./Cell";
import GameOverlay from "./GameOverlay";
import { Board } from "../helper"
import useEvent from "../hooks/useEvent";



const BoardView = () => {
    const [board, setBoard] = useState(new Board());

    const handleKeyDown = (event) => {
        if (board.hasWon()){
            return;
        }

        if (board.hasLost()){
            setBoard(newBoard)
            return;
        }

        if (event.keyCode >= 37 && event.keyCode <= 40){
            let direction = event.keyCode - 37
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board)
            let newBoard = boardClone.move(direction)
            setBoard(newBoard)
        }
    }
    
    useEvent("keydown", handleKeyDown)

    const resetBoard = () => {
        setBoard(new Board())
    }

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col, colIndex) => {
                    return <Cell key={rowIndex * board.size + colIndex}/>
                })}
            </div>
        )
    })


    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, index) => {
        return (<Tile tile={tile} key={index}/>)
    })

    return (
        <div>
            <div className="details-box">
                <div className="resetButton" onClick={resetBoard}>new game</div>
                <div className="score-header">
                    <div className="score-title">Score</div>
                    <div className="score-box">{board.score}</div>
                </div>
            </div>
            <div className="board">
                {cells}
                {tiles}
                {<GameOverlay onRestart={resetBoard} board={board}/>}
            </div>
        </div>
    )
}

export default BoardView;