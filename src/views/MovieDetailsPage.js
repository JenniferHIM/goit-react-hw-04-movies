import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import * as api from '../services/serviceApi';
import styles from './PageStyles.module.css';

const Cast = lazy(() =>
  import('../components/Cast' /* webpackChunkName: "cast-subview" */),
);
const Review = lazy(() =>
  import('../components/Reviews' /* webpackChunkName: "reviews-subview" */),
);

const Movies = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    api.getMovieDetails(movieId).then(movie => {
      setMovie(movie);
    });
  }, [movieId]);

  return (
    <>
      {movie && (
        <div className={styles.container}>
          <h2 className={styles.title}>{movie.title || movie.name}</h2>
          <img
            className={styles.poster}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
            }
            alt={movie.title || movie.name}
          ></img>

          <p className={styles.movieItem}>
            Genres:
            <span className={styles.descript}>
              {movie.genres.map(genre => genre.name).join(' / ')}
            </span>
          </p>

          <p className={styles.movieItem}>
            Release date:
            <span className={styles.descript}> {movie.release_date || ''} </span>
          </p>

          <p className={styles.movieItem}>
            Vote:<span className={styles.vote}> {movie.vote_average} </span>/ Votes:{' '}
            <span className={styles.vote}> {movie.vote_count} </span>
          </p>

          <p className={styles.movieItem}>
            About:
            <span className={styles.descript}>{movie.overview}</span>
          </p>

          <p className={styles.movieItem}>
            <NavLink
              to={`${url}/cast`}
              className={styles.subLinks}
              activeClassName={styles.activeSubLinks}
            >
              Actors
            </NavLink>
            <NavLink
              to={`${url}/reviews`}
              className={styles.subLinks}
              activeClassName={styles.activeSubLinks}
            >
              Reviews
            </NavLink>
          </p>

          <Suspense
            fallback={
              <Loader type="Circles" color="#00BFFF" height={80} width={80} />
            }
          >
            <Route path={`${path}/cast`}>
              <Cast movieId={movieId} />
            </Route>

            <Route path={`${path}/reviews`}>
              <Review movieId={movieId} />
            </Route>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Movies;