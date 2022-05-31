import React from 'react'
import ReactPaginate from "react-paginate";

const Paginate = () => {
    return (
        <ReactPaginate
            // previousLabel={"Previous"}
            // nextLabel={"Next"}
            // pageCount={pageCount}
            // onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
        />
    )
}

export default Paginate
