import React, { Component } from "react";
import Recipe from "../Recipe/Recipe";
import moment from "moment";
import SearchHistory from "../SearchHistory/SearchHistory";
import "./inputForm.css";
class InputForm extends Component {
  constructor() {
    super();

    this.state = {
      query: "",
      recipeResult: []
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   *
   * get data from localStorage
   * push to data
   * insert to localStorage
   */
  getSearch = event => {
    event.preventDefault();
    const { query } = this.state;
    const searchedTitle = this.getQuery();
    searchedTitle.push({ title: query, date: Date.now() });

    this.storeQuery(searchedTitle);

    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${process.env.App_ID} &app_key=${process.env.APP_KEY}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          recipeResult: data.hits,
          query: "",
          title: this.getQuery()
        })
      );
  };
  storeQuery(historyArray) {
    localStorage.setItem("history", JSON.stringify(historyArray));
  }
  getQuery = () => {
    const history = localStorage.getItem("history");
    if (history) {
      const parsedData = JSON.parse(history);
      return parsedData;
    }
    return [];
  };

  initQuery() {
    this.storeQuery([]);
  }

  componentDidMount() {
    if (!this.getQuery()) {
      this.initQuery();
    }
  }

  clearStorage = () => {
    localStorage.clear();
    this.setState({
      query: ""
    });
  };
  clearQuery = date => {
    const queryHistory = this.getQuery();
    const filterQuery = queryHistory.filter(item => item.date !== date);
    this.storeQuery(filterQuery);
    // Re-render
    this.setState({ ...this.state });
  };
  render() {
    return (
      <div className="container">
        <div className="form--container">
          <form onSubmit={this.getSearch} autoComplete="on">
            <input
              type="text"
              name="query"
              value={this.state.query}
              placeholder="Search recipes  ..."
              onChange={this.onChange}
              className="input--field"
            ></input>
            <button className="search--btn" type="submit">
              Search
            </button>
          </form>
          <div className="search--list">
            <div className="search--list--title">
              <span>Search history</span>
              <span
                className="search--list--title--left"
                onClick={this.clearStorage}
              >
                Clear search history{" "}
              </span>
            </div>
            {this.getQuery().map(history => (
              <SearchHistory
                key={history.date}
                historyTitle={history.title}
                historyDate={moment(history.date).format("YYYY-DD-MM, h:mm a")}
                clearBtn={
                  <span onClick={() => this.clearQuery(history.date)}> X</span>
                }
              />
            ))}
          </div>
        </div>
        {this.state.recipeResult.map(item => (
          <Recipe
            key={item.recipe.uri}
            title={item.recipe.label}
            calories={item.recipe.calories}
            image={item.recipe.image}
            ingredients={item.recipe.ingredients}
          />
        ))}
      </div>
    );
  }
}
export default InputForm;
