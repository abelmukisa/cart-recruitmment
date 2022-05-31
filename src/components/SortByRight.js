import React from 'react'
import { connect } from 'react-redux'
import { ToggleSort } from '../actions'

const SortByRight = (props) => {
    return (
        <div class="col-lg-6">
            <div class="sort-by text-end">
                <div class="sort-title mr-20px" onClick={(e) => { props.ToggleSort() }}>
                    <span class="sort-by-vectors">&#8593;&#8595;</span>
                    <span class="sort-title active">sort by</span>
                </div>
                <div class="sort-title2">
                    <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Price
							</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        _products: state._todoProduct,
        isAscending: state.isAscending,
        Carts: state.Carts
    };
}
function mapDispatchToProps(dispatch) {
    return {
        ToggleSort: () => dispatch(ToggleSort()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SortByRight)