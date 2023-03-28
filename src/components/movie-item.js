import React from "react";
// import { format } from "date-fns";
export default class MovieItem extends React.Component {
  _imgUrl = "https://image.tmdb.org/t/p/w500";

  render() {
    const { title, overview, poster_path } = this.props;
    // const date = format(new Date(release_date), "MMMM dd, yyyy");
    return (
      <div className="card">
        <div className="image-wrapper">
          <img
            className="image"
            alt="aboba"
            src={`${this._imgUrl}${poster_path}`}
          />
        </div>
        <div className="description">
          <p className="title">{title}</p>
          <p></p>
          <p className="date"></p>
          <div className="overview-wrapper">
            <p className="overview">{overview}</p>
          </div>
        </div>
      </div>
    );
  }
}
