import produce from "immer";

export const initialState = {
  board: [], //[0,black,white...]
  black_pieces: [], //[{id: id, position: i}, {id: id, position: i}]
  white_pieces: [],
  king: [],
  forbidden_squares: [0, 10, 60, 110, 120],
  availableSquares: [],
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_DATA':
      return produce(state, draft => {
        draft.board = action.board;
      })

    case 'SET_AVAILABLE_SQUARES':
      return produce(state, draft => {
        draft.availableSquares = action.squares;
      })

    default:
      return state
  }
}
