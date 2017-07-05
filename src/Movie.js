import React, {Component} from 'react';
import $ from 'jquery';

class Movie extends Component{
    constructor(props){
        super(props);
        // can use 'this.state' because it is a class!!!!!
        this.state = {
            movie: {}
        }
    }

// componentDidMount only runs once after the first render. After it runs then componentWillUpdate
    // runs all updates
    componentDidMount() {
        const mid = this.props.match.params.movieId;
        $.getJSON('https://api.themoviedb.org/3/movie/'+mid+'api_key=fec8b5ab27b292a68294261bb21b04a5', (movie)=> {
            console.log(movie)
            this.setState({
                movie: movie
            })
        })
    }
// this will continue to update after componentDidMount
    componentWillUpdate(nextProps, nextState){
        // const movieId = nextProps.match.params.movieId;
        // console.log(nextProps);
        // $.getJSON('https://api.themoviedb.org/3/movie/'+movieId+'api_key=fec8b5ab27b292a68294261bb21b04a5', (movie)=> {
        //     console.log(movie);
        //     this.setState({
        //         movie: movie
        //     })
        // })
    }

    componentWillReceiveProps(nextProps){
        const movieId = nextProps.match.params.movieId;
        console.log(nextProps)
        $.getJSON('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=fec8b5ab27b292a68294261bb21b04a5', (movie)=> {
            console.log(movie)
            this.setState({
                movie: movie
            })
        })
    }

    // Params are inside of props.match
    render() {
        console.log(this.props);

        if(this.state.movie == {}){
            return (
                <h1>{this.props.match.params.movieId}</h1>
            )
        }else{
            return(
                <div className="col-sm-8">
                    {this.state.movie.title}
                </div>
            )
        }
    }
}

export default Movie;