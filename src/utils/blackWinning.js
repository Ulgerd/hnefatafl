import { findRow } from './findRow.js';
import { neighbourSquares } from '../data/gameConditions.js';

export const blackWinning = (board, kingID, prevNum) => {
  let row = findRow(kingID);

  let kingIsDead = neighbourSquares.every((sqNum) => {
    let border = (sqNum === -11 || sqNum === 11) ? [0, 120] : row;
    let dead;
    if (sqNum === -11 || sqNum === -11) {
      dead = (
        (board[kingID + sqNum] !== 'white' && board[kingID + sqNum] !== 0) ||
        prevNum+sqNum === 0)
        ? true
        : false;
    } else if (kingID+sqNum >= border[0] && kingID+sqNum <= border[1]) {
        dead = (
          ['black', 'throne', 'escape'].indexOf(board[kingID + sqNum]) !== -1 ||
          prevNum+sqNum === 0
        )
        ? true
        : false;
    } else {
      dead = true;
    }
    return dead;
  })

  if (kingIsDead) {
    board[kingID] = 0;
  };
}
