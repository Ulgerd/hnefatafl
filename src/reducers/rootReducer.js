import produce from "immer";

export const initialState = {
  initialBoard: [],
  board: [], //[0,black,white...]
  availableSquares: [],
  history: [],
  attackersTurn: true,
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_INITIAL_DATA':
      return produce(state, draft => {
        draft.initialBoard = action.board;
        draft.board = action.board;
        draft.history = [draft.initialBoard];
      })

    case 'SET_DATA':
      return produce(state, draft => {
        draft.board = action.board;
        if (draft.history.length <= 9) {
          draft.history.push(action.board);
        } else {
          draft.history.shift();
          draft.history.push(action.board);
        }
      })

    case 'SET_AVAILABLE_SQUARES':
      return produce(state, draft => {
        draft.availableSquares = action.squares;
      })

    case 'SET_NEW_GAME':
      return produce(state, draft => {
        draft.board = draft.initialBoard; 
        draft.history = [draft.initialBoard];
        draft.attackersTurn = true;
      })

    case 'SET_TURN':
      return produce(state, draft => {
        draft.attackersTurn = (action.blockAll) ? 'All' : !draft.attackersTurn;
      })

    case 'RETURN_GAME_TO_TURN':
      return produce(state, draft => {
        draft.attackersTurn = action.turn % 2 ? false : true;
        draft.board = draft.history[action.turn];
        draft.history = draft.history.slice(0, action.turn+1)
      })

    default:
      return state
  }
}
