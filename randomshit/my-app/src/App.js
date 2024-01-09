// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import './board.css';
import board from './board.json';

const ChessBoard = () => {
 const [boardState, setBoardState] = useState(board);
 const [selectedPiece, setSelectedPiece] = useState(null);

 const handleCellClick = (row, col) => {
    const cell = boardState[row][col];
    if (selectedPiece && cell.piece) {
      movePiece(setBoardState, selectedPiece, cell);
      setSelectedPiece(null);
    } else if (cell.piece) {
      setSelectedPiece(cell);
    }
 };

 useEffect(() => {
   console.log(boardState);
 }, [boardState]);

 return (
    <div className="App">
      <table className="board">
        <tbody>
          {boardState.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                 key={colIndex}
                 className={cell.piece ? 'piece' : ''}
                 onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                 {cell.piece && (
                    <div className={`piece ${cell.piece.color} ${cell.piece.type}`}></div>
                 )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 );
};

const movePiece = (setBoardState, selectedPiece, targetCell) => {
 setBoardState((prevBoard) => {
   const newBoard = JSON.parse(JSON.stringify(prevBoard));
   newBoard[selectedPiece.row][selectedPiece.col].piece = null;
   newBoard[targetCell.row][targetCell.col].piece = selectedPiece.piece;
   return newBoard;
 });
};

export default ChessBoard;