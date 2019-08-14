export const winningConditionsCheck = (board, srcID, destID) => {
  
  if ( board[srcID] === 'king' && board[destID] === 'escape') {
    alert('Победа защитников!')
    return true;
  }

  if ( !(board.some(piece => piece === 'king')) ) {
    alert('Победа нападающих!')
    return true;
  }
  return false;
}
