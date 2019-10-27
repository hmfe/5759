import React, { Component } from "react";
import "./Recipe.css";
class Recipe extends Component {
  render() {
    return (
      <div>
        <hr></hr>
        <div className="result--container">
          <h1>{this.props.title}</h1>
          <h3> Calories: {this.props.calories}</h3>
          <ul>
            <h3> Ingredients</h3>
            {this.props.ingredients.map((item, key) => (
              <li className="result--ingredients" key={key}>
                {item.text}
              </li>
            ))}
          </ul>
          <div className="result--img-wrapper">
            <img src={this.props.image} alt="food recipe" />
          </div>
        </div>
      </div>
    );
  }
}
export default Recipe;
