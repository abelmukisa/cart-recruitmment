import { combineReducers } from 'redux';
import { GET_ALL_PRODUCT, GET_NUMBER_CART, ADD_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART, CLEAR_CART, TOGGLE_CART, TOGGLE_SORT, SET_ALL_PRODUCT } from '../actions';

const initProduct = {
    numberCart: 0,
    Carts: [],
    _products: [],
    isOpen: false,
    isAscending: null,
    isPriceAscending: null
}

function todoProduct(state = initProduct, action) {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                // _products: action.payload
                _products: state._products,
            }
        case SET_ALL_PRODUCT:
            return {
                ...state,
                _products: action.payload
            }
        case GET_NUMBER_CART:
            return {
                ...state
            }
        case TOGGLE_SORT:
            console.log("here sorting");
            var sortBy = "";
            var isAsc = false;
            if (state.isAscending == null) {
                sortBy = "asc";
                isAsc = true;
            }
            else if (state.isAscending === true) {
                sortBy = "desc";
                isAsc = false;
            } else {
                sortBy = "asc";
                isAsc = true;
            }
            var items = [...state._products];
            if (sortBy == "asc") {
                items.sort((a, b) => (a.name ? a.name.toLowerCase() : "").localeCompare((b.name ? b.name.toLowerCase() : "")));
            } else {
                items.sort((a, b) => (b.name ? b.name.toLowerCase() : "").localeCompare((a.name ? a.name.toLowerCase() : "")));
            }
            console.log("items", items);
            return {
                ...state,
                _products: items,
                isAscending: isAsc
            }
        case ADD_CART:
            if (state.numberCart == 0) {
                console.log("::payload:", action);
                let cart = {
                    id: action.payload.id,
                    quantity: 1,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price
                }
                state.Carts.push(cart);
                console.log(":;Addedto cart", state.Carts);
            }
            else {
                let check = false;
                state.Carts.map((item, key) => {
                    if (item.id == action.payload.id) {
                        state.Carts[key].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        id: action.payload.id,
                        quantity: 1,
                        name: action.payload.name,
                        image: action.payload.image,
                        price: action.payload.price
                    }
                    state.Carts.push(_cart);
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1,
                isOpen: true
            }
        case INCREASE_QUANTITY:
            state.numberCart++
            state.Carts[action.payload].quantity++;

            return {
                ...state
            }
        case DECREASE_QUANTITY:
            let quantity = state.Carts[action.payload].quantity;
            if (quantity > 1) {
                state.numberCart--;
                state.Carts[action.payload].quantity--;
            }

            return {
                ...state
            }
        case DELETE_CART:
            let quantity_ = state.Carts[action.payload].quantity;
            return {
                ...state,
                numberCart: state.numberCart - quantity_,
                Carts: state.Carts.filter(item => {
                    return item.id != state.Carts[action.payload].id
                })

            }
        case CLEAR_CART:
            return {
                ...state,
                numberCart: 0,
                Carts: [],
                isOpen: false
            }
        case TOGGLE_CART:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        default:
            return state;
    }
}
const ShopApp = combineReducers({
    _todoProduct: todoProduct
});
export default ShopApp;