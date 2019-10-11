import React, { Component } from "react";
import APIManager from "../../modules/apimanager"

class NewsEditForm extends Component {
  state = {
    title: "",
    synopsis: "",
    URL: "",
    timestamp: "",
    loadingStatus: true
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingArticle = evt => {
    evt.preventDefault();
    this.setState({ loadingStatus: true });
    const timestamp = new Date().toLocaleString();
    const editedArticle = {
      id: this.props.match.params.articleId,
      title: this.state.title,
      synopsis: this.state.synopsis,
      URL: this.state.URL,
      timestamp: timestamp
    };

    APIManager.put("articles", editedArticle).then(() => this.props.history.push("/news"));
  };

  componentDidMount() {
    APIManager.get("articles", this.props.match.params.articlesId).then(article => {
      const timestamp = new Date().toLocaleString();
      this.setState({
        title: article.title,
        synopsis: article.synopsis,
        URL: article.URL,
        timestamp: timestamp,
        loadingStatus: false
      });
    });
  }

  render() {
    return (
      <>
        <form>
          <fieldset>
            <div>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="title"
                value={this.state.title}
              />
              <label htmlFor="title">Title</label>

              <input
                type="text"
                required
                onChange={this.handleFieldChange}
                id="synopsis"
                value={this.state.synopsis}
              />
              <label htmlFor="synopsis">Synopsis</label>

              <input
                type="URL"
                required
                onChange={this.handleFieldChange}
                id="URL"
                value={this.state.URL}
              />
              <label htmlFor="URL">URL</label>
            </div>
            <div>
              <button
                type="button"
                disabled={this.state.loadingStatus}
                onClick={this.updateExistingArticle}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </>
    );
  }
}

export default NewsEditForm;
