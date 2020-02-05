import * as type from "actions/action-types";
const initialState = {
  level: "",
  mines: [],
  loading: false,
  gameover: false
};
export default function app(state = initialState, action) {
  switch (action.type) {
    case type.SET_MINE_DATA:
      return { ...state, mines: action.payload.mines };
    case type.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case type.SET_LEVEL:
      return { ...state, level: action.payload.level };
    case type.GAMEOVER:
      return { ...state, gameover: true };
    case type.RESET_GAME:
      return { ...state, gameover: false };
    case type.CLEAR:
      return { ...initialState };
    default:
      return state;
  }
}
