import React from "react";
import AutoComplete from "material-ui/AutoComplete";
import GithubService from "../../services/GithubService";
import RaisedButton from 'material-ui/RaisedButton';


class CreatePage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { dataSource: [] };
        this.selectedRepoName = null;

    }

    async componentDidMount()
    {
        const repoNames = await GithubService.getRepoNames();
        const userProfile = await GithubService.getUserProfile(); 
  
        this.setState( { dataSource: repoNames, email: userProfile.email, gitIconUrl: userProfile.avatar_url, defaultBranch: null });
    }

    onClick = async (event) => {
        if(this.selectedRepoName===null)
        {
                alert("Please input a repo name");
                this.setState({defaultBranch: null});
        }
        else
        {
            const repos = await GithubService.getRepos();
            const selectedItem = repos.filter(item=> item.name == this.selectedRepoName);
            this.setState({defaultBranch: selectedItem.default_branch});
        }
    }

    onNewRequest = (chosenRequest, index) => {
        this.selectedRepoName = chosenRequest;
    }

  render() {
    return (
      <div style={{ margin: "auto" }} >
          <img src={this.state.gitIconUrl} width="80px" height="80px" />
          <h1>{this.state.email}</h1>
        <AutoComplete
          floatingLabelText="Enter your target repository"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.dataSource}
          maxSearchResults={5}
          onNewRequest={this.onNewRequest}
        />
        <RaisedButton label="Create" primary={true} onClick={this.onClick} />
        <br/>
        { this.state.defaultBranch!=null ? this.state.default_branch : null }
      </div>
    );
  }
}

export default CreatePage;
