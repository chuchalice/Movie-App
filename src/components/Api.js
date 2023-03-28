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

  async getMovies() {
    const res = await this.getResource(`/movie/popular/${this._token}`);
    return res.results;
  }

  getMovie(id) {
    return this.getResource(`/movie/${id}${this._token}&language=en-US`);
  }
  async getSearchMovie(query) {
    const res = await this.getResource(
      `/search/movie${this._token}&language=en-US&query=${query}&page=1`
    );
    return res.results;
  }
}
