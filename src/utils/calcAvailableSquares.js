import { neighbourSquares } from '../data/gameConditions.js';
import { findRow } from './findRow.js';

export const calcAvailableSquares = (droppableId, board) => {
  let result=[];
  let row = findRow(droppableId);
  let currPiece = board[droppableId];

  neighbourSquares.map((sqNum) => {
    let neighbSqNum = +droppableId + sqNum;
    let limit;
    if (sqNum === -11) limit = 0;
    if (sqNum === -1) limit = row[0];
    if (sqNum === 1) limit = row[1];
    if (sqNum === 11) limit = 120;

    while (sqNum < 0 ? (neighbSqNum >= limit) : (neighbSqNum <= limit)) {

      if ( currPiece === 'king' &&
           ['white', 'black'].indexOf(board[neighbSqNum]) !== -1 ) break;

      if (currPiece !== 'king' &&
          board[neighbSqNum] !== 0) break;

      result.push(neighbSqNum);
      neighbSqNum += sqNum;
    }
    return null;
  })

  return result;
}
