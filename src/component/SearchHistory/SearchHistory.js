import React, { Component } from "react";
import "./SearchHistory.css";

export default class SearchHistory extends Component {
  render() {
    return (
      <div className="search--list--item">
        <h1> {this.props.historyTitle}</h1>
        <div className="search--list--delete">
          <span className="search--list--time"> {this.props.historyDate}</span>
          <span>{this.props.clearBtn}</span>
        </div>
      </div>
    );
  }
}
