import React from 'react'
import BackGroundImage from "./img/banner-bg.jpg";

const HeadLine = () => {
    return (
        <div class="row g-0">
            <div class="col-lg-12">
                <div class="controls">
                    <h3 class="title">
                        samurai king resting</h3>
                    <button class="add-cart-btn">ADD TO CART</button>
                </div>
                <div class="img" style={{ backgroundImage: `url(${BackGroundImage})` }} >
                    <div class="img-label">photo of the day</div>
                </div>
            </div>
        </div>
    )
}

export default HeadLine
