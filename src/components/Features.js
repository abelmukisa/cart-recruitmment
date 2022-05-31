import React, { useState, useEffect } from 'react'
import { getAll } from "./Firebase-Config";
import { AddCart } from '../actions';
import { connect } from 'react-redux';



const Features = (props) => {
    const [featuredProduct, setFeaturedProduct] = useState([]);

    useEffect(() => {
        const dataPromise = getAll();
        dataPromise.then(data => {
            let temp = data.filter(item => item.featured && item.featured === true);
            if (temp.length > 0) {
                setFeaturedProduct(temp[0]);
            }
        });
    }, []);

    const getImgSrc = (product) => {
        if (product && product.image && typeof product.image == 'string') {
            return product.image;
        } else if (product && product.image && typeof product.image == 'object') {
            return product.image.src;
        }
        return "";
    }

    const getDescription = (product) => {
        if (product && product.details && typeof product.details == 'string') {
            return product.details;
        } else if (product && product.details && typeof product.details == 'object') {
            return product.details.description ? product.details.description : "";
        }
        return "";
    }

    const getRecomendations = (product) => {
        if (product && product.details && typeof product.details == 'object' && product.details.recommendations && Array.isArray(product.details.recommendations)) {
            return product.details.recommendations.map(item => {
                return {
                    src: item.src ? item.src : '',
                    alt: item.alt ? item.alt : ''
                };
            })
        }
        return [];
    }

    const getSize = (product) => {
        if (product && product.details && typeof product.details == 'object') {
            return `${product.details.size ? product.details.size : ''} mb`;
        }
        return "";
    }

    const getDimensions = (product) => {
        if (product && product.details && typeof product.details == 'object' && product.details.dimmentions) {
            let width = product.details.dimmentions.width ? product.details.dimmentions.width : '';
            let height = product.details.dimmentions.height ? product.details.dimmentions.height : '';
            return ` ${width} x ${height} pixel`;
        }
        return "";
    }

    return (
        <div>
            {featuredProduct != null &&
                < section className="featured" >
                    <div className="row g-0">
                        <div className="col-lg-12">
                            <div className="controls">
                                <h3 className="title">{featuredProduct.name}</h3>
                                <button className="add-cart-btn" onClick={(e) => props.AddCart(featuredProduct)} >ADD TO CART</button>
                            </div>
                            <div className="img" style={{ backgroundImage: `url(${getImgSrc(featuredProduct)})` }} >
                                <div className="img-label">photo of the day </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-lg-7 pl-10px">
                            <h4 className="sub-title">about {featuredProduct.name}</h4>
                            <h6 className="category">{featuredProduct.category ? featuredProduct.category : ''}</h6>
                            <p className="details" dangerouslySetInnerHTML={{ __html: getDescription(featuredProduct) }} ></p>
                        </div>
                        <div className="col-lg-5">
                            <h4 className="sub-title-right text-end">people also buy</h4>
                            <div className="details-image">
                                <div>
                                    {getRecomendations(featuredProduct).map((item) => {
                                        return (
                                            <img src={item.src ? item.src : ''} alt={item.alt ? item.alt : ''} />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="details-right">
                                <div className="details-text text-end">
                                    <h6 className="detail-title ">details</h6>
                                    <p className="details-info">size: {getDimensions(featuredProduct)}</p>
                                    <p className="details-info">size: {getSize(featuredProduct)} </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            }
        </div >
    )
}

const mapStateToProps = state => {
    return {
        _products: state._todoProduct,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        AddCart: product => dispatch(AddCart(product)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Features)
