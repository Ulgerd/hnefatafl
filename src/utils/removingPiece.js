import { removeKing } from './removeKing.js';
import { findRow } from './findRow.js';
import { neighbourSquares } from '../data/gameConditions.js';

/*
  Checking, if any piece should be removed.
*/

export const removingPiece = (board, source, droppableId) => {
  let currPiece = board[source];

  let row = findRow(droppableId);
  let newBoard = [...board];

  neighbourSquares.map ((num) => {
    let neighbPiecePos = +droppableId + num;
    let neighbourPiece = newBoard[neighbPiecePos];
    let nboPiecePos = neighbPiecePos+num; //next but one
    let nboPiece = newBoard[nboPiecePos];

    let bordVal = (num === -11 || num === 11) ? [0, 120] : row;

    //neighbour piece check
    if (neighbourPiece === 0) return null;
    if (neighbourPiece === 'throne') return null;
    if (neighbourPiece === currPiece) return null;
    if (neighbPiecePos < bordVal[0] || neighbPiecePos > bordVal[1]) return null;
    if (currPiece === 'white' && neighbourPiece === 'king') return null;
    if (currPiece === 'king' && neighbourPiece === 'white') return null;
    if (currPiece === 'black' && neighbourPiece === 'king') {
      removeKing(newBoard, neighbPiecePos, num);
    }
    //next but one piece check
    if (nboPiece === 0) return null;
    if (nboPiecePos < bordVal[0] || nboPiecePos > bordVal[1]) return null;

    if ([currPiece, 'throne', 'escape'].indexOf(nboPiece) !== -1 &&
        neighbourPiece !== 'king') {
          newBoard[neighbPiecePos] = 0;
    };

    if ((nboPiece === 'king' && currPiece==='white') ||
        (nboPiece === 'white' && currPiece==='king')) {
      newBoard[neighbPiecePos] = 0;
    }

    return null;
  })

  return newBoard;
}
