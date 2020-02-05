/**
 * Action để dispatch từ React
 */
import {
  TOGGLE_FLAG,
  GAMEOVER,
  CLEAR,
  SET_MINE_DATA,
  RESET_GAME,
  GET_MINE_DATA,
  SET_LEVEL,
  TOGGLE_LOADING
} from "./action-types";

export const setBoardMinesData = data => {
  return {
    type: SET_MINE_DATA,
    payload: { ...data }
  };
};

export const getBoardMinesData = data => {
  return {
    type: GET_MINE_DATA,
    payload: { ...data }
  };
};

export const toggleFlag = flagged => {
  return {
    type: TOGGLE_FLAG,
    payload: { flagged }
  };
};

export const toggleLoading = data => {
  return {
    type: TOGGLE_LOADING,
    payload: { ...data }
  };
};

export const setLevel = data => {
  return {
    type: SET_LEVEL,
    payload: { ...data }
  };
};

export const gameover = () => {
  return { type: GAMEOVER };
};

export const resetGame = () => {
  return { type: RESET_GAME };
};

export const clear = () => {
  return { type: CLEAR };
};
