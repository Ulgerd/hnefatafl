export const winningConditionsCheck = (board, srcID, destID) => {

  if ( board[srcID] === 'king' && board[destID] === 'escape') {
    return 'Defenders win!';
  }

  if ( !(board.some(piece => piece === 'king')) ) {
    return 'Attackers win!';
  }
  return false;
}
