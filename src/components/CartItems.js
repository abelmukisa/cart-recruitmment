import React from 'react'
import CartImage from "./img/cart-image-one.jpeg";
import BreadCrumb from './BreadCrumb';
import CheckBoxes from './CheckBoxes';
import SortByRight from './SortByRight';
import Products from './Products';

const CartItems = () => {
    return (
        <section class="cart-items">
            <div class="horizontal-line"></div>
            <div class="row g-0">
                <BreadCrumb />
                <SortByRight />
            </div>
            <div class="row g-0">
                <div class="sort-filter">
                    <CheckBoxes />
                    <Products />
                </div>
            </div>

        </section>
    )
}

export default CartItems
