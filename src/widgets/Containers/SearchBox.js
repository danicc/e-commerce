import React from "react";
import { Button } from "react-bootstrap";
import { css } from "react-emotion";

const labelMargin = css`
  margin: 8px;
`;

class SearchBox extends React.Component {
  state = {
    searchText: ""
  };

  handleSearchTextChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.searchText);
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <label className={labelMargin} htmlFor="search">
          Search <br />
          <input
            id="search"
            type="text"
            placeholder={this.props.placeholder}
            value={this.state.searchText}
            onChange={this.handleSearchTextChange}
          />
        </label>
        <Button type="submit">BUSCAR</Button>
      </form>
    );
  }
}

export default SearchBox;
