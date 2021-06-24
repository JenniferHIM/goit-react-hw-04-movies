import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Pagination } from '@material-ui/lab';
import SearchBar from '../components/SearchBar';
import MoviesList from '../components/MoviesList';
import * as api from '../services/serviceApi';

const MoviesView = () => {
    const [movies, setMovies] = useState(null);
    const [request, setRequest] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    useEffect(() => {
        if (!request) {
            return;
        }

        api.searchMovies(request, page).then(data => {
            if (!data.result.length) {
                toast.error('Nothing was found. Try again.');
                return;
            }
            setMovies(data.result);
            setTotalPages(data.total_pages);
        });
    }, [request, page]);

    const onClick = request => {
        setRequest(request);
        setPage(1);
    };
    
    const handleChange = (e, value) => {
        setPage(value);
    };

    return (
        <>
            <SearchBar onClick={onClick} />
            {movies && <MoviesList movies={movies} />}
            
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

export default MoviesView;