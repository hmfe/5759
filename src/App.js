import React, { Component } from "react";
import Recipe from "./component/Recipe/Recipe";
import InputForm from "./component/Forms/inputForm";
class App extends Component {
  constructor() {
    super();
    this.state = {
      recipeResult: []
    };
  }
  render() {
    return (
      <div>
        <InputForm />
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
export default App;
