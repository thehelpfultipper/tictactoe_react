import React, { useRef, useEffect } from 'react';

import s from  './Board.module.css';

export default function BoardGrid({board, onCellClick, ...props}) {
    let cellRef= useRef([]);
    const numRows = 3;
    const numCols = 3;

    const moveFocus = (newIndex) => {
        if (newIndex >= 0 && newIndex < numRows * numCols) {
          cellRef.current[newIndex].focus();
        }
      };

    const keyPressHandler = (e, index) => {
        console.log('index: ' + index);
        if (e.key === 'Enter') {
            onCellClick(index);
        } else if (e.key === 'ArrowUp') {
            moveFocus(index - numCols);
          } else if (e.key === 'ArrowDown') {
            moveFocus(index + numCols);
          } else if (e.key === 'ArrowLeft') {
            moveFocus(index === 0 ? index + numCols - 1 : index - 1);
          } else if (e.key === 'ArrowRight') {
            moveFocus(index === numCols * numRows - 1 ? index - numCols + 1 : index + 1);
          }
    }
    
    const cellClickHandler = (index) => {
      let clickedCell = cellRef.current[index];
      props.onCellActive(true);
      props.onSetCell(prevCell => [...prevCell, clickedCell]);
      onCellClick(index, clickedCell);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault(); // Prevent default browser scroll behavior
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    return (
        <div className={s.board}>
            {
                board.map((cell, index) => {
                    return <div
                        className={`${s.cell}`}
                        key={index}
                        tabIndex={0}
                        ref={el=>(cellRef.current[index] = el)}
                        onClick={() => cellClickHandler(index)}
                        onKeyDown={(e)=>keyPressHandler(e, index)}
                    >{cell}</div>
                })
            }
        </div>
    )
}
