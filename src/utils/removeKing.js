import { findRow } from './findRow.js';
import { neighbourSquares } from '../data/gameConditions.js';

/*
  Checking, if king should be removed.
*/

export const removeKing = (board, kingID, prevNum) => {
  let row = findRow(kingID);

  let kingIsDead = neighbourSquares.every((sqNum) => {
    let kingsNeighbSqNum = kingID+sqNum;
    let kingsNeighbSq = board[kingsNeighbSqNum];
    let border = (sqNum === -11 || sqNum === 11) ? [0, 120] : row;
    let dead = false;

    if (prevNum+sqNum === 0) dead = true;
    if (kingsNeighbSqNum < border[0] && kingsNeighbSqNum > border[1]) dead = true;
    if (['black', 'throne', 'escape'].indexOf(kingsNeighbSq) !== -1) dead = true;
    return dead;
  })

  if (kingIsDead) {
    board[kingID] = 0;
  };
}
