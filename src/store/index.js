import Store from "./store/index.js";
import createReducers from "./reducers.js";

export default new Store(createReducers());