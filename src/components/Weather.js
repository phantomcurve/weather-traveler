import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: []
    };
  }
  makeApiCall = () => {
    fetch(`api-key=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          this.setState({
            isLoaded: true,
            //weatherHere: jsonifiedResponse.results
          });
        })
        .catch((error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
  }
  render() {
    const { error, isLoaded, weather } = this.state;
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (!isLoaded) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>Headlines</h1>
          <ul>
            {weather.map((weather, index) =>
              <li key={index}>
                <h3>{weather.current}</h3>
                <p>{weather.forecast}</p>
              </li>
            )}
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Weather;


