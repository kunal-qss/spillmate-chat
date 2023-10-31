import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ReactPaginate from "react-paginate";
import data from "../spillmate_dataset_vBeta_500";
// Example items, to simulate fetching from another resources.
import "./index.css";
import { Accordion } from "react-bootstrap";

function Items({ currentItems }) {
  return (
    <>
      <Accordion defaultActiveKey="0">
        {currentItems &&
          currentItems.map((item, i) => {
            return (
              <Accordion.Item eventKey={i} key={i}>
                <Accordion.Header>Chat Item {i + 1}</Accordion.Header>
                <Accordion.Body>
                  {item.messages.map((data, i) => {
                    if (i === 0) return;
                    return (
                      <div key={i}>
                        <h3>{data.role}</h3>
                        <p>{data.content}</p>
                      </div>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </>
  );
}
function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<PaginatedItems itemsPerPage={10} />);
