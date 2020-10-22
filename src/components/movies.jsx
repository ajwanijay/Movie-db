import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

import Pagniation from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount() {
        const genres = [{ _id: " ", name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres: genres });
    }
    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies })
    }
    handleLike = (movie) => {

        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movie[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked;
        this.setState({ movies: movies });

    }
    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }
    handleGenreSelect = (genre) => {

        this.setState({ selectedGenre: genre, currentPage: 1 });
    }
    handleSort = (sortColumn) => {

        this.setState({ sortColumn });
    }
    render() {
        if (this.state.movies.length === 0) return <p>there aint no movies</p>

        const count = this.state.movies.length;
        const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state;

        const filterd = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                    <p>There are {filterd.length} movies</p>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagniation
                        itemsCount={filterd.length}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage} />
                </div>
            </div>
        );
    }
}

export default Movies;