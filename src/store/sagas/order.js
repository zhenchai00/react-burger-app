import { put } from 'redux-saga/effects';
import axios from '../../axios-order';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/order';

export function* purchaseBurgerSaga(action) {
    try {
        yield put(actions.purchaseBurgerStart());
        const response = yield axios.post("/orders.json?auth=" + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error.response.data.error));
    }
};

export function* fetchOrdersSaga(action) {
    console.log("fetchOrdersSaga called", action);
    try {
        yield put(actions.fetchOrdersStart());
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const response = yield axios.get("/orders.json" + queryParams);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key,
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error.message));
    }
};