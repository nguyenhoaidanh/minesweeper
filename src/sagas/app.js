import { takeLatest, takeEvery, call, put, delay } from "redux-saga/effects";
import * as type from "actions/action-types";
import * as appActions from "actions/app";
import { AXIOS } from "utils/axios";

/*** Listener lắng nghe action để xử lý*/
export default function* app() {
  yield takeLatest(type.GET_MINE_DATA, getMinesDataAsync);
}

function* getMinesDataAsync(action) {
  try {
    yield put(appActions.toggleLoading());
    const { data: res } = yield call(getMinesDataReq, action.payload);
    yield put(appActions.setBoardMinesData({ mines: res.data }));
  } catch (error) {
    console.log(error);
  } finally {
    yield delay(1000);
    yield put(appActions.toggleLoading());
  }
}

const getMinesDataReq = data => {
  let { size, mines } = data;
  return AXIOS(`/getMines?size=${size}&mines=${mines}`, "GET", data);
};
