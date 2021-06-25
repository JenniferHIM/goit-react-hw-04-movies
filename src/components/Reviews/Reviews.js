import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Pagination } from '@material-ui/lab';
import PropTypes from 'prop-types';
import * as api from '../../services/serviceApi';
import styles from './Reviews.module.css';

const Reviews = ({ movieId }) => {
    const [reviewsList, setReviewList] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        api.getReviews(movieId, page).then(data => {
            console.log(data);
            if (!data.result.length) {
                toast.error('No revies for this movie');
                return;
            }
            setReviewList(data.result);
            setTotalPages(data.total_pages);
        });
    }, [movieId, page]);

    const getAvatar = path => {
        if (!path) {
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png';
        }
        if (path.incledes('http')) {
            return path.slice(path.indexOf('h'));
        }
        return `https://image.tmdb.org/t/p/w500/${path}`;
    };

    const handleChange = (evt, value) => {
        setPage(value);
    };

     return (
    <>
      {reviewsList && (
        <ul className={styles.reviewList}>
          {reviewsList.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <div className={styles.imageBox}>
                <img
                  className={styles.avatar}
                  src={getAvatar(review.author_details.avatar_path)}
                  alt={review.author}
                ></img>
              </div>
              <div className={styles.reviewsBox}>
                <h2 className={styles.name}>{review.author}</h2>
                <p className={styles.movieItem}>
                  {review.updated_at.slice(0, review.updated_at.indexOf('T'))}
                </p>
                <p className={styles.content}>{review.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          boundaryCount={2}
          color="secondary"
        />
      )}
    </>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default Reviews;
