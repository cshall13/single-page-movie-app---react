import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import nba from './nba';
import $ from 'jquery';
import Movie from './Movie';

// below are router imports. above(first 3) are the normal(out of the box) imports from create router app
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  constructor(props){
      super(props);
      this.state ={
          gists: []
      }
  }

  // this code WILL NOT run until render has run at least one time
  componentDidMount() {
    $.getJSON('https://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5&query=superman', (gists)=>{
        // this.state.gists = gists ********BBBAAAADDDD*****
        this.setState({
            gists: gists.results
        })
    })
  }

  render() {
      if(this.state.gists.length === 0){
          return(<h1>Loading...</h1>)
      }
      console.log(this.state.gists);
      // LOCAL variable called gist.
      // NOT the same thing as this.state.gists
    const localGists = [];
    this.state.gists.map((gist, index)=>{
        localGists.push(
            <div key={index}>
                {/*Link tag is a fancy tag (component inside of router)**** MUST BE CAPITAL 'L'***** */}
                {/*same functionality as a tag but a tag would take us to a new page, Link tag keeps us on the same page*/}
                <Link key={index} to={`/g/${gist.id}`}>{gist.title}</Link>
            </div>
        )
    });

      // the router component goes around EVERYTHING the router needs to control
    return (
      <Router>
          <div className="container">
              <h1>Welcome to the gists page!</h1>
              {/*when the router finds the path that is a 'match' to what the user is looking for,*/}
              {/*it is called a 'match'*/}
              <Route path="/nba" component={nba} />
              <div className="movie-list col-sm-6">
              {/*this is the variable above(line 36) that is an array with a length of 20 */}
                  {localGists}
              </div>
              <div className="col-sm-6">
                  {/* ": something", just like express, means wildcard*/}
                <Route path='/g/:movieId' component={Movie} />
              </div>
          </div>
      </Router>
    );
  }
}

export default App;
