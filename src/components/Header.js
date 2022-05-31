import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ClearCart, ToggleCart } from '../actions'

const Header = (props) => {


    const getImgSrc = (product) => {
        if (product && product.image && typeof product.image == 'string') {
            return product.image;
        } else if (product && product.image && typeof product.image == 'object') {
            return product.image.src;
        }
        return "";
    }

    const ClearCart = (props) => {
        props.ClearCart();
    }


    return (
        <nav className="navbar fixed-top p-0 bg-white">
            <div className="container-fluid">
                <div className="navbar-items-container">
                    <a className="navbar-brand" href="#">
                        <img src="assets/img/logo.png" alt="bejamas logo" />
                    </a>
                    <div className="cart-btn" onClick={(e) => { props.ToggleCart() }} >
                        <img src="assets/img/shopping-cart.png" />
                        {props._products.Carts.length > 0 &&
                            <div className="number-display" >
                                {props._products.Carts.length}
                            </div>
                        }
                    </div>
                </div>
            </div>
            {props._products.isOpen === true && props._products.Carts.length > 0 &&
                <div className="cart-preview-window" >
                    <div className="close-btn" onClick={(e) => { props.ToggleCart() }} >
                        <img src="assets/img/close-btn.png" />
                    </div>
                    <div className="cart-preview-list">
                        {props._products.Carts.map((product) => {
                            return (
                                <div className="cart-preview-item">
                                    <div className="details">
                                        <div className="name">{product.name}</div>
                                        <div className="price"> $ {product.price}</div>
                                    </div>
                                    <img src={getImgSrc(product)} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="clear-btn" onClick={(e) => ClearCart(props)} >CLEAR</div>

                </div>
            }
        </nav>
    )
}


const mapStateToProps = state => {
    return {
        _products: state._todoProduct,

    };
}
function mapDispatchToProps(dispatch) {
    return {
        ClearCart: () => dispatch(ClearCart()),
        ToggleCart: () => dispatch(ToggleCart()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)