export const piecesCounter = (obj) => {
  return obj.board.reduce((allPieces, piece)=>{
    if (piece in allPieces) {
      allPieces[piece]++;
    }
    else {
      allPieces[piece] = 1;
    }
    return allPieces;
  }, {})
}
