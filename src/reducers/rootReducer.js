import produce from "immer";

export const initialState = {
  initialBoard: [],
  board: [], //[0,black,white...]
  availableSquares: [],
  history: [], // [{turn: 1, board: []}]
  attackersTurn: true,
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_INITIAL_DATA':
      return produce(state, draft => {
        draft.initialBoard = action.board;
        draft.board = action.board;
        draft.history = [{turn: 0, board: draft.initialBoard}];
      })

    case 'SET_DATA':
      return produce(state, draft => {
        draft.board = action.board;
        if (draft.history.length <= 9) {
          draft.history.push({turn: draft.history[draft.history.length-1].turn+1, board: action.board});
        } else {
          draft.history.shift();
          draft.history.push({turn: draft.history[draft.history.length-1].turn+1, board: action.board});
        }
      })

    case 'SET_AVAILABLE_SQUARES':
      return produce(state, draft => {
        draft.availableSquares = action.squares;
      })

    case 'SET_NEW_GAME':
      return produce(state, draft => {
        draft.board = draft.initialBoard;
        draft.history = [{turn: 0, board: draft.initialBoard}];
        draft.attackersTurn = true;
      })

    case 'SET_TURN':
      return produce(state, draft => {
        draft.attackersTurn = (action.blockAll) ? 'All' : !draft.attackersTurn;
      })

    case 'RETURN_GAME_TO_TURN':
      return produce(state, draft => {
        draft.attackersTurn = action.turn % 2 ? false : true;
        draft.history.map((obj, i) => {
          if (obj.turn === action.turn) {
            draft.board = obj.board;
            draft.history = draft.history.slice(0, i+1)
          }
        })
      })

    default:
      return state
  }
}
