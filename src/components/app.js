import React from "react";
import MovieItem from "./movie-item";
import ApiService from "./Api";
import Search from "./search";
import { Spin } from "antd";
import ErrorIndicator from "./error-indicator";
import { Pagination } from "antd";
import { Tabs } from "antd";
import { MovieServiceProvider } from "./movie-api-service";

export default class App extends React.Component {
  api = new ApiService();

  state = {
    movieCards: [],
    loading: false,
    error: false,
    length: 0,
    query: "",
    items: [
      {
        key: "1",
        label: `Movies`,
      },
      {
        key: "2",
        label: `Ratings`,
      },
    ],
    genres: [],
    switchedTab: false,
    ratedMovies: [],
    sessionKey: "",
  };

  componentDidMount() {
    const key = sessionStorage.getItem("key");
    // console.log(key);
    if (!key) {
      this.api.createGuestSession();
    }
    // sessionStorage.clear();
    this.api.getGenres().then((res) => {
      this.setState({ genres: res.genres });
    });
  }

  switchTab() {
    this.setState(({ switchedTab }) => {
      return {
        switchedTab: !switchedTab,
      };
    });
    this.api.getRatedMovies().then((res) => {
      // console.log(res);
      this.setState({ ratedMovies: res.results });
      // console.log(this.state.ratedMovies);
    });
  }

  createCard = (page, query = this.state.query) => {
    if (!query) return;

    this.api.getSearchMovie(query, page).then((res) => {
      // console.log(res);
      if (res.results.length) {
        this.setState(({ movieCards }) => {
          return {
            movieCards: res.results,
            loading: false,
            error: false,
            length: res.total_pages,
            query: query,
          };
        });
      } else {
        this.setState({ error: true, loading: false });
      }
    });
  };

  rateMovie = (id, value) => {
    this.api.rateMovie(id, value);
  };

  setProgressColor = (value) => {
    if (value < 3) return "#E90000";
    if (value >= 3 && value <= 5) return "#E97E00";
    if (value >= 5 && value <= 7) return "#E9D100";
    if (value > 7) return "#66E900";
  };

  render() {
    const {
      movieCards,
      loading,
      error,
      length,
      genres,
      switchedTab,
      ratedMovies,
    } = this.state;
    console.log(ratedMovies);
    return (
      <MovieServiceProvider value={genres}>
        <section className="movies">
          <Tabs
            onChange={() => this.switchTab()}
            centered
            className="tabs"
            defaultActiveKey="1"
            items={this.state.items}
          />
          {!switchedTab ? (
            <>
              <Search createCard={this.createCard} />
              {loading ? <Spin /> : null}
              {error && movieCards ? (
                <ErrorIndicator />
              ) : (
                <div className="wrapper">
                  {movieCards.map((cardProps) => (
                    <MovieItem
                      rateMovie={this.rateMovie}
                      setProgressColor={this.setProgressColor}
                      key={cardProps.id}
                      {...cardProps}
                    />
                  ))}
                </div>
              )}
              {!error && !loading && movieCards.length ? (
                <div className="pagination">
                  <Pagination
                    defaultCurrent={1}
                    total={length}
                    onChange={(current) => this.createCard(current)}
                  />
                </div>
              ) : null}
            </>
          ) : (
            <div className="wrapper">
              {ratedMovies.map((cardProps) => (
                <MovieItem
                  rateMovie={this.rateMovie}
                  setProgressColor={this.setProgressColor}
                  key={cardProps.id}
                  {...cardProps}
                />
              ))}
            </div>
          )}
        </section>
      </MovieServiceProvider>
    );
  }
}
