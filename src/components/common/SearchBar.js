import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useOutsideClose from "../../hooks/useOutsideClose";
import useScrollDisable from "../../hooks/useScrollDisable";
// import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSearch as toggleSearchRedux,
  setSearchResults as setSearchResultsRedux,
} from "../../redux/commonSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.data.products);
  const isSearchOpenRedux = useSelector((state) => state.common.isSearchOpen);
  const searchResultsRedux = useSelector((state) => state.common.searchResults);

  const searchRef = useRef();

  // closing the SearchBar
  const closeSearch = () => {
    /*  */
    dispatch(toggleSearchRedux(false));
    dispatch(setSearchResultsRedux([]));
    /*  */
  };

  useOutsideClose(searchRef, closeSearch);
  /*  */
  useScrollDisable(isSearchOpenRedux);
  /*  */

  // handling Search
  const handleSearching = (e) => {
    const searchedTerm = e.target.value.toLowerCase().trim();

    const updatedSearchResults = productsData.filter((item) =>
      item.title.toLowerCase().includes(searchedTerm)
    );

    searchedTerm === ""
      ? dispatch(setSearchResultsRedux([]))
      : dispatch(setSearchResultsRedux(updatedSearchResults));
  };

  return (
    <>
      {isSearchOpenRedux && (
        <div id="searchbar" className="backdrop">
          <div className="searchbar_content" ref={searchRef}>
            <div className="search_box">
              <input
                type="search"
                className="input_field"
                placeholder="Search for product..."
                onChange={handleSearching}
              />
              {/* <button
                                    type="button"
                                    className="btn"
                                    disabled={searchResults.length === 0}
                                >
                                    <AiOutlineSearch />
                                </button> */}
            </div>

            {searchResultsRedux.length !== 0 && (
              <div className="search_results">
                {searchResultsRedux.map((item) => {
                  const { id, title, path } = item;
                  return (
                    <Link to={`${path}${id}`} onClick={closeSearch} key={id}>
                      {title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
