import FavoriteMovieIdb from '../data/favorite-movie-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtoninitiator = {
  async init({ likeButtonContainer, movie }) {
    this.__likeButtonContainer = likeButtonContainer;
    this.__movie = movie;

    await this.__renderButton();
  },

  async __renderButton() {
    const { id } = this.__movie;

    if (await this.__isMovieExist(id)) {
      this.__renderLiked();
    } else {
      this.__renderLike();
    }
  },

  async __isMovieExist(id) {
    const movie = await FavoriteMovieIdb.getMovie(id);
    return !!movie;
  },

  __renderLike() {
    this.__likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.putMovie(this.movie);
      this.__renderButton();
    });
  },

  __renderLiked() {
    this.__likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.deleteMovie(this.__movie.id);
      this.__renderButton();
    });
  },
};

export default LikeButtoninitiator;
