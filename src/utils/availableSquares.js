export const availableSquares = (droppableId, board) => {
  let rows = [[0,10],[11,21],[22,32],[33,43],[44,54],[55,65],[66,76],[77,87],[88,98],[99,109],[110,120]];
  let row;
  let result=[];

  rows.map((delta) => {
    if (droppableId >= delta[0] && droppableId <= delta[1]) row = delta;
  })

  let a = +droppableId - 1;
  while (a >= row[0]) {
    if (board[a] !== 0) break;
    result.push(a);
    a--
  }

  let b = +droppableId + 1;
  while (b <= row[1]) {
    if (board[b] !== 0) break;
    result.push(b);
    b++
  }

  let c = +droppableId - 11;
  while (c >= 0) {
    if (board[c] !== 0) break;
    result.push(c);
    c -=11
  }

  let d = +droppableId + 11;
  while (d <= 120) {
    if (board[d] !== 0) break;
    result.push(d);
    d +=11
  }

  return result;
}
