export const removingPiece = (source, droppableId, board) => {
  let currentPiece = board[source]; // white black king

  let rows = [[0,10],[11,21],[22,32],[33,43],[44,54],[55,65],[66,76],[77,87],[88,98],[99,109],[110,120]];
  let row;
  let newBoard = [...board]

  rows.map((delta) => {
    if (droppableId >= delta[0] && droppableId <= delta[1]) row = delta;
  })

  let a = +droppableId - 1;
  if (newBoard[a] !== 0 && newBoard[a] !== currentPiece && a >= row[0]) {
    if (newBoard[a-1] !== 0 && a-1 >= row[0] && !(currentPiece === 'white' && newBoard[a] === 'king') && (newBoard[a-1] === currentPiece || newBoard[a-1] === 'escape' || newBoard[a-1] === 'throne' || (newBoard[a-1] === 'king' && currentPiece==='white') ) ) newBoard[a] = 0;
  };

  let b = +droppableId - 11;
  if (newBoard[b] !== 0 && newBoard[b] !== currentPiece && b >= 0) {
    if (newBoard[b-11] !== 0 && b-11 >= 0 && !(currentPiece === 'white' && newBoard[b] === 'king') && (newBoard[b-11] === currentPiece || newBoard[b-11] === 'escape' || newBoard[b-11] === 'throne' || (newBoard[b-11] === 'king' && currentPiece==='white'))) newBoard[b] = 0;
  };

  let c = +droppableId + 1;
  if (newBoard[c] !== 0 && newBoard[c] !== currentPiece && c <= row[1]) {
    if (newBoard[c+1] !== 0 && c+1 <= row[1] && !(currentPiece === 'white' && newBoard[c] === 'king') && (newBoard[c+1] === currentPiece || newBoard[c+1] === 'escape' || newBoard[c+1] === 'throne' || (newBoard[c+1] === 'king' && currentPiece==='white'))) newBoard[c] = 0;
  };

  let d = +droppableId + 11;
  if (newBoard[d] !== 0 && newBoard[d] !== currentPiece && d <= 120) {
    if (newBoard[d+11] !== 0 && d+11 <= 120 && !(currentPiece === 'white' && newBoard[d] === 'king') && (newBoard[d+11] === currentPiece || newBoard[d+11] === 'escape' || newBoard[d+11] === 'throne' || (newBoard[d+11] === 'king' && currentPiece==='white'))) newBoard[d] = 0;
  };

  return newBoard;
}
