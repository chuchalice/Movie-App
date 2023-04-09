import React from "react";
import { intlFormat } from "date-fns";
import { Progress } from "antd";
import { Rate } from "antd";
import { MovieServiceConsumer } from "./movie-api-service";
import { Tag } from "antd";
export default class MovieItem extends React.Component {
  _imgUrl = "https://image.tmdb.org/t/p/w500";

  render() {
    const {
      title,
      release_date,
      overview,
      poster_path,
      vote_average,
      setProgressColor,
      genre_ids,
      id,
      rateMovie,
    } = this.props;

    let date = "no data";
    if (release_date && release_date !== "") {
      date = intlFormat(
        new Date(release_date),
        { year: "numeric", month: "long", day: "numeric" },
        {
          locale: "en-EN",
        }
      );
    }
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
          <div className="genres">
            <MovieServiceConsumer>
              {(genres) =>
                genre_ids.map((el) => {
                  let newEl = <Tag key={el.id}>Unknown</Tag>;
                  genres.forEach((genre) => {
                    if (el === genre.id) {
                      newEl = <Tag key={genre.id}>{genre.name}</Tag>;
                    }
                  });
                  return newEl;
                })
              }
            </MovieServiceConsumer>
          </div>
          <p className="date">{date}</p>
          <div className="overview-wrapper">
            <p className="overview">{overview}</p>
          </div>
        </div>
        <Progress
          className="progress-bar"
          size={40}
          type="circle"
          percent={Math.floor(vote_average * 10)}
          format={(percent) => (percent / 10).toFixed(1)}
          strokeColor={setProgressColor(vote_average)}
        />
        <Rate
          defaultValue={+sessionStorage.getItem(id) || 0}
          className="rating"
          count={10}
          onChange={(value) => {
            sessionStorage.setItem(id, value);
            rateMovie(id, value);
          }}
        />
      </div>
    );
  }
}
