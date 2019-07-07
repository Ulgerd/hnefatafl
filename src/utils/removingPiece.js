export const removingPiece = (source, droppableId, board) => {
  let typeOfPiece = board[source];

  let rows = [[0,10],[11,21],[22,32],[33,43],[44,54],[55,65],[66,76],[77,87],[88,98],[99,109],[110,120]];
  let row;
  let result=[];

  let newBoard = [...board]

  rows.map((delta) => {
    if (droppableId >= delta[0] && droppableId <= delta[1]) row = delta;
  })

  let a = +droppableId - 1;
  if (newBoard[a] !== 0 && newBoard[a] !== typeOfPiece && a >= row[0]) {
    if (newBoard[a-1] !== 0 && newBoard[a-1] === typeOfPiece && a-1 >= row[0])
    newBoard[a] = 0;
  };

  let b = +droppableId - 11;
  if (newBoard[b] !== 0 && newBoard[b] !== typeOfPiece && b >= 0) {
    if (newBoard[b-11] !== 0 && newBoard[b-11] === typeOfPiece && b-11 >= 0)
    newBoard[b] = 0;
  };

  let c = +droppableId + 1;
  if (newBoard[c] !== 0 && newBoard[c] !== typeOfPiece && c <= row[1]) {
    if (newBoard[c+1] !== 0 && newBoard[c+1] === typeOfPiece && c+1 <= row[1])
    newBoard[c] = 0;
  };

  let d = +droppableId + 11;
  if (newBoard[d] !== 0 && newBoard[d] !== typeOfPiece && d <= 120) {
    if (newBoard[d+11] !== 0 && newBoard[d+11] === typeOfPiece && d+11 <= 120)
    newBoard[d] = 0;
  };

  return newBoard;
}
