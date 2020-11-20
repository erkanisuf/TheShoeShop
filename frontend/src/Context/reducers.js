const addProduct = (dispatch, state) => {
  console.log("add");
};
const removeProduct = (dispatch, state) => {
  return { ...state, cart: [] };
};

const fetchProduct = (dispatch, state) => {
  return { ...state, cart: dispatch.product };
};

const userLogin = (dispatch, state) => {
  console.log("logged", dispatch);
  return { ...state, token: dispatch.token };
};
const userLoout = (dispatch, state) => {
  window.localStorage.removeItem("UserToken");
  return { ...state, token: null };
};

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProduct(action, state);
    case REMOVE_PRODUCT:
      return removeProduct(action, state);
    case FETCH_PRODUCT:
      return fetchProduct(action, state);
    case USER_LOGIN:
      return userLogin(action, state);
    case USER_LOGOUT:
      return userLoout(action, state);
    default:
      return state;
  }
};
