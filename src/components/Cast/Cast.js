import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab';
import * as api from '../../services/serviceApi';
import styles from './Cast.module.css';

const Cast = ({ movieId }) => {
    const [castList, setCastList] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        api.getCastList(movieId).then(data => {
            setCastList(data.cast);
            setTotalPages(Math.ceil(data.cast.length / 20));
            setPage(1);
        });
    }, [movieId]);

    const handleChange = (e, value) => {
        setPage(value);
    };

    return (
        <>
            {castList && (
                <div className={styles.container}>
                    <ul className={styles.castList}>
                        {castList
                            .filter((el, index) =>
                                index >= page * 20 - 20 && index <= page * 20 - 1)
                            .map(actor => (
                                <li key={actor.id} className={styles.castItem}>
                                    <img
                                        className={styles.photo}
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                                                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
                                        }
                                        alt={actor.name}
                                    ></img>
                                    <div className={styles.descriptBox}>
                                        <h2 className={styles.name}>{actor.name}</h2>
                                        <p className={styles.roleBox}>
                                            <span className={styles.role}>Character:</span>
                                            <span>{actor.character}</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                    </ul>
                    {totalPages > 1 && (
                        <div>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handleChange}
                                boundaryCount={2}
                                color="secondary"
                            />
                        </div>
                    )}

                </div>
            )}
        </>
    );
};

Cast.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default Cast;