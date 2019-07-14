export const winningConditionsCheck = (board, sourceID, destinationID) => {
  if ( board[sourceID] === 'king' && board[destinationID] === 'escape') {
    alert('Победа защитников!')
    return true;
  }

  if ( !(board.some(piece => piece === 'king')) ) {
    alert('Победа нападающих!')
    return true;
  }
  return false;
}
