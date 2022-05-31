import React, { useState, useEffect } from 'react'
import { useQuery } from "react-query";
import { getAll } from "./Firebase-Config";
import { AddCart, SetAllProducts } from '../actions'
import { connect } from 'react-redux';
import BreadCrumb from './BreadCrumb';



const Products = (props) => {
    const [productData, setProductData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [checkedCategoryFilters, setCheckedCategoryFilters] = useState([]);
    const [checkedPriceFilter, setCheckedPriceFilter] = useState("");
    const [pagesCount, setPagesCount] = useState(0);
    const pageSize = 6;

    useEffect(() => {
        setPageNumber(1);
        const dataPromise = getAll();
        dataPromise.then(data => {
            let count = data.length == 0 ? 0 : Math.ceil(data.length / pageSize);
            setPagesCount(count);
            props.SetAllProducts(data)
            setProductData(data);
        });
    }, []);

    const getPageData = () => {
        let startIndex = (pageNumber - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let data = productData.slice(startIndex, endIndex);
        return data;
    }

    const toggleSort = (props) => {
        // console.log("here sorting", props._products);
        var sortBy = "";
        var isAsc = false;
        if (props._products.isAscending == null) {
            sortBy = "asc";
            isAsc = true;
        }
        else if (props._products.isAscending === true) {
            sortBy = "desc";
            isAsc = false;
        } else {
            sortBy = "asc";
            isAsc = true;
        }
        var items = [...props._products._products];
        if (sortBy == "asc") {
            items.sort((a, b) => (a.name ? a.name.toLowerCase() : "").localeCompare((b.name ? b.name.toLowerCase() : "")));
        } else {
            items.sort((a, b) => (b.name ? b.name.toLowerCase() : "").localeCompare((a.name ? a.name.toLowerCase() : "")));
        }
        setProductData(items);
        props._products.isAscending = isAsc;
        setPageNumber(1);
    }

    const togglePriceSort = (props) => {
        var sortBy = "";
        var isAsc = false;
        if (props._products.isPriceAscending == null) {
            sortBy = "asc";
            isAsc = true;
        }
        else if (props._products.isPriceAscending === true) {
            sortBy = "desc";
            isAsc = false;
        } else {
            sortBy = "asc";
            isAsc = true;
        }
        var items = [...props._products._products];
        if (sortBy == "asc") {
            items.sort((a, b) => (a.price ? parseFloat(a.price) : 0) - ((b.price ? parseFloat(b.price) : 0)));
        } else {
            items.sort((a, b) => (b.price ? parseFloat(b.price) : 0) - ((a.price ? parseFloat(a.price) : 0)));
        }
        setProductData(items);
        props._products.isPriceAscending = isAsc;
        setPageNumber(1);
    }

    const goToPage = (pgNo) => {
        setPageNumber(pgNo);
    };

    const goToNext = () => {
        let nextPage = pageNumber + 1;
        if (nextPage > pagesCount) {
            nextPage = pagesCount;
        }
        setPageNumber(nextPage);
    };

    const goToPrev = () => {
        let nextPage = pageNumber - 1;
        if (nextPage < 1) {
            nextPage = 1;
        }
        setPageNumber(nextPage);
    };

    const getImgSrc = (product) => {
        if (product && product.image && typeof product.image == 'string') {
            return product.image;
        } else if (product && product.image && typeof product.image == 'object') {
            return product.image.src;
        }
        return "";
    }

    const showBestSeller = (product) => {
        if (product && product.bestseller && product.bestseller === true) {
            return <div className="cart-label" >best seller </div>
        }
        return <div className="" ></div>;
    }

    let categoryFilters = ["people", "premium", "pets", "food", "landmarks", "cities", "nature"];
    let priceRangeFilters = [
        {
            label: "lower than $200",
            lowerValue: Number.MIN_SAFE_INTEGER,
            upperValue: 200
        },
        {
            label: "$20 - $100",
            lowerValue: 20,
            upperValue: 100
        },
        {
            label: "$100 - $200",
            lowerValue: 100,
            upperValue: 200
        },
        {
            label: "More than $200",
            lowerValue: 200,
            upperValue: Number.MAX_SAFE_INTEGER
        }
    ];

    const onFilterChanged = (props, categoryName, processCategory = true, rangeFilter = null) => {
        let cpy = [...checkedCategoryFilters];
        if (processCategory === true) {
            let index = cpy.indexOf(categoryName);
            if (index > -1) {
                //remove it
                cpy.splice(index, 1);
            } else {
                //add it 
                cpy.push(categoryName);
            }
        }

        var filtered = [];
        if (cpy.length == 0) {
            filtered = props._products._products;
        } else {
            filtered = props._products._products.filter((product) => {
                var cat = product.category ? product.category : "";
                return cpy.indexOf(cat) > -1;
            });
        }
        //filter out according to the checked price
        if (rangeFilter == null && checkedPriceFilter != null) {
            rangeFilter = checkedPriceFilter;
        }
        if (rangeFilter && rangeFilter.label.length > 0) {
            filtered = filtered.filter((product) => {
                var price = product.price ? parseFloat(product.price) : 0;
                return price >= rangeFilter.lowerValue && price < rangeFilter.upperValue;
            });
        }
        let count = filtered.length == 0 ? 0 : Math.ceil(filtered.length / pageSize);
        setPagesCount(count);
        setProductData(filtered);
        setCheckedCategoryFilters(cpy);
    }

    const onPriceRangeFilterChanged = (props, rangeFilter) => {
        onFilterChanged(props, "", false, rangeFilter);
        setCheckedPriceFilter(rangeFilter);
    }



    const getFilterCheckBoxes = () => {

        return (
            <div className="col-lg-3">
                <h6 className="sort-category">category</h6>
                {categoryFilters.map((categoryName) => {
                    return (
                        <div className="form-check" >
                            <input className="form-check-input" onChange={(e) => { onFilterChanged(props, categoryName) }} type="checkbox" value="" id={`flexCheck${categoryName}`} />
                            <label className="form-check-label" for={`flexCheck${categoryName}`}>
                                {categoryName}
                            </label>
                        </div>
                    )
                })}
                <div className="category-hr-line"></div>
                <h6 className="sort-category">price range</h6>
                {priceRangeFilters.map((rangeFilter) => {
                    return (
                        <div className="form-check" >
                            <input checked={(checkedPriceFilter ? checkedPriceFilter.label : '') == rangeFilter.label} className="form-check-input" onChange={(e) => { onPriceRangeFilterChanged(props, rangeFilter) }} type="checkbox" value="" id={`flexCheck${rangeFilter.label}`} />
                            <label className="form-check-label" for={`flexCheck${rangeFilter.label}`}>
                                {rangeFilter.label}
                            </label>
                        </div>
                    )
                })}
            </div>
        )
    }


    const getPrevBtn = () => {
        if (pageNumber > 1) {
            return <button className="previousBtn" onClick={() => goToPrev()}>&#x2039;</button>
        } else {
            return <button className="previousBtn">&nbsp;&nbsp;</button>
        }
    }

    const getNextBtn = () => {
        if (pageNumber < pagesCount) {
            return <button className="nextBtn" onClick={() => goToNext()}>&#x203A;</button>
        } else {
            return <button className="previousBtn">&nbsp;&nbsp;</button>
        }
    }



    return (
        <section className="cart-items">
            <div className="horizontal-line"></div>
            <div className="row g-0">
                <BreadCrumb />

                {/* sorting */}
                <div className="col-lg-6">
                    <div className="sort-by text-end">
                        <div className="sort-title mr-20px" onClick={(e) => { toggleSort(props) }} >
                            <span className="sort-by-vectors">&#8593;&#8595;</span>
                            <span className="sort-title active">sort by</span>
                        </div>
                        <div className="sort-title2">
                            <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Price
							</button>
                            <ul className="dropdown-menu pointer" aria-labelledby="dropdownMenuButton1">
                                <li><span className="dropdown-item pointer" href="#" onClick={(e) => { togglePriceSort(props) }}>Lowest</span></li>
                                <li><span className="dropdown-item pointer" href="#" onClick={(e) => { togglePriceSort(props) }}>Highest</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* end sorting */}
            </div>
            <div className="row g-0">
                <div className="col-lg-12 sort-filter">
                    <div className="row">
                        {getFilterCheckBoxes()}
                        <div className="col-lg-9 product-list-section">
                            <div className="row">
                                {getPageData().map((product) => {
                                    return (
                                        <div className="col-lg-4" >
                                            <div className="product ">
                                                <div className="cart-image" style={{ backgroundImage: `url(${getImgSrc(product)})` }}>

                                                    {showBestSeller(product)}

                                                    <div className="cart-btn" >
                                                        <button onClick={(e) => { props.AddCart(product) }} className="add-cart-btn">
                                                            ADD TO CART
                                                </button>
                                                    </div>
                                                </div>
                                                <div className="cart-details">
                                                    <p className="cart-category">{product.category}</p>
                                                    <h2 className="cart-item-name">{product.name}</h2>
                                                    <p className="cart-item-price">{product.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row">
                                <div className="col-lg-12 pagination-wrapper">
                                    <div className="pagination">
                                        {getPrevBtn()}
                                        {Array.from({ length: pagesCount }, (_, i) => {
                                            return <button classNameName={`pageBtn ${pageNumber == (i + 1) ? 'active' : ''}`} onClick={() => goToPage(i + 1)} >{i + 1}</button>
                                        })}
                                        {getNextBtn()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section >

    )
}

const mapStateToProps = state => {
    return {
        _products: state._todoProduct
    };
}
function mapDispatchToProps(dispatch) {
    return {
        AddCart: product => dispatch(AddCart(product)),
        SetAllProducts: (products) => dispatch(SetAllProducts(products)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products)
