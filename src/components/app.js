import React from "react";
import MovieItem from "./movie-item";
import ApiService from "./Api";
import SearchBar from "./search";

export default class App extends React.Component {
  api = new ApiService();

  state = {
    movieCards: [],
  };
  constructor() {
    super();
    this.createCard();
  }

  createCard() {
    this.api.getSearchMovie(`return`).then((res) => {
      this.setState(({ movieCards }) => {
        return {
          movieCards: res,
        };
      });
    });
  }

  render() {
    const { movieCards } = this.state;
    // console.log(movieCards);
    return (
      <section className="movies">
        <SearchBar />
        <div className="wrapper">
          {movieCards.map((cardProps) => (
            <MovieItem key={cardProps.id} {...cardProps} />
          ))}
        </div>
      </section>
    );
  }
}
