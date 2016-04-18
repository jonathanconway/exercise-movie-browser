import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

export default class MoviesStore extends BaseStore {

  static storeName = "MoviesStore"

  static handlers = {
    [Actions.LOAD_MOVIES_SUCCESS]: "handleLoadSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
  }

  handleLoadSuccess({ genre, movies }) {
    this.movies = movies;
    this.emitChange();
  }

  getMovies() {
    return this.movies;
  }

  getGenres() {
    if (this.movies && this.movies.length) {
      return this.movies.reduce(function (a, b) {
        return a.genres.concat(
          b.genres.filter(function (bb) {
            return a.genres.indexOf(bb) === -1;
          }));
      });
    }
  }

  dehydrate() {
    return {
      movies: this.movies,
      genres: this.genres
    };
  }

  rehydrate(state) {
    this.movies = state.movies;
    this.genres = state.genres;
  }

}
