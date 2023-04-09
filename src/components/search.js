import React from "react";
import { Input } from "antd";
// import _debounce from "debounce";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }
  debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };

  debouncedSearch = this.debounce((text) => {
    this.props.createCard(1, text.trim());
  }, 400);

  inputValueHandler = (e) => {
    const { searchValue } = this.state;
    this.setState({
      searchValue: e.target.value,
    });
    this.debouncedSearch(searchValue);
  };

  render() {
    return (
      <Input
        value={this.state.searchValue}
        onChange={(e) => this.inputValueHandler(e)}
        className="search-bar"
        placeholder="Чтобы начать поиск ведите название фильма..."
      />
    );
  }
}
