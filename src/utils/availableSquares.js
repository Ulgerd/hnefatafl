import { rows, neighbourSquares } from '../data/gameConditions.js';

export const availableSquares = (droppableId, board) => {
  let row;
  let result=[];

  rows.map((delta) => {
    if (droppableId >= delta[0] &&
        droppableId <= delta[1]) row = delta;
    return null;
  });

  neighbourSquares.map((sqNum) => {
    let a = +droppableId + sqNum;
    while (sqNum === -11 ? (a >= 0) :
           sqNum === -1 ? (a >= row[0]) :
           sqNum === 1 ? (a <= row[1]) : (a <= 120)) {
      if ( board[droppableId] === 'king' &&
           ['white', 'black'].indexOf(board[a]) !== -1 ) break;
      if (board[droppableId] !== 'king' &&
          board[a] !== 0) break;
      result.push(a);
      a += sqNum;
    }
    return null;
  })

  return result;
}
