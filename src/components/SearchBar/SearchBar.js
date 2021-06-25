import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './SearchBar.module.css';

const SearchBar = ({ onClick }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInput = e => {
        setSearchQuery(e.target.value);
    }

    const handleClick = e => {
        e.preventDefault();

        if (searchQuery === '') {
            toast.error('Nothing to find. Check input field please');
            return;
        }

        onClick(searchQuery);
    };

    return (
        <form className={styles.searchBar} onSubmit={handleClick}>
            <label>
                <input
                    className={styles.input}
                    type="text"
                    autoComplete="off"
                    placeholder="Search movie"
                    value={searchQuery}
                    onChange={handleInput}
                ></input>
            </label>
            <button className={styles.button} type="submit">
                Search
            </button>
        </form>
    );
};

SearchBar.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SearchBar;