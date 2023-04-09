import React from "react";

export default class ApiService extends React.Component {
  _apiBase = "https://api.themoviedb.org/3";
  _token = "?api_key=b413e7228cddfa3722d4267aaecbca42";

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getPopularMovies(page) {
    const res = await this.getResource(
      `/movie/popular/${this._token}&language=en-US&page=${page}`
    );
    return res.results;
  }

  async getSearchMovie(query, page) {
    const res = await this.getResource(
      `/search/movie${this._token}&language=en-US&query=${query}&page=${page}`
    );

    return res;
  }
  async getGenres() {
    const res = await this.getResource(`/genre/movie/list${this._token}`);
    return res;
  }
  createGuestSession = async () => {
    const res = await this.getResource(
      `/authentication/guest_session/new${this._token}`
    );
    // this.sessionId = res.guest_session_id;
    sessionStorage.setItem("key", res.guest_session_id);
    return res;
  };

  rateMovie = async (id, value) => {
    try {
      await fetch(
        `${this._apiBase}/movie/${id}/rating${
          this._token
        }&guest_session_id=${sessionStorage.getItem("key")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ value }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  getRatedMovies = async () => {
    const res = await fetch(
      `${this._apiBase}/guest_session/${sessionStorage.getItem(
        "key"
      )}/rated/movies${this._token}`
    );
    return await res.json();
  };
}
