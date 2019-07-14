import { blackWinning } from './blackWinning.js';
import { findRow } from './findRow.js';
import { neighbourSquares } from '../data/gameConditions.js';

export const removingPiece = (board, source, droppableId) => {
  let currPiece = board[source];

  let row = findRow(droppableId);
  let newBoard = [...board];

  neighbourSquares.map ((num) => {
    let neighbPiecePos = +droppableId + num;
    let neighbourPiece = newBoard[neighbPiecePos];
    let nboPiecePos = neighbPiecePos+num; //next but one
    let nboPiece = newBoard[nboPiecePos];

    let border = (num === -11 || num === 11) ? [0, 120] : row;

    if (neighbourPiece !== 0 &&
       [currPiece, 'throne', 'escape'].indexOf(neighbourPiece) === -1 &&
       !(currPiece === 'white' && neighbourPiece === 'king') &&
       !(currPiece === 'king' && neighbourPiece === 'white') &&
       (nboPiecePos >= 0 && nboPiecePos <= 120)
     ) {
      if (currPiece === 'black' && neighbourPiece === 'king') {
        blackWinning(newBoard, neighbPiecePos, num);
      } else if (nboPiece !== 0 &&
        (nboPiecePos >= border[0] && nboPiecePos <= border[1]) &&
        ([currPiece, 'throne', 'escape'].indexOf(nboPiece) !== -1 ||
        (nboPiece === 'king' && currPiece==='white') )
      ) {
        newBoard[neighbPiecePos] = 0;
      }
    }
    return null;
  })

  return newBoard;
}
