import React from "react";
import AutoComplete from "material-ui/AutoComplete";
import GithubService from "../../services/GithubService";

class CreatePage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { dataSource: ["abc","def","abc123"] };
    }

    componentDidMount()
    {
        GithubService.getRepos( (data) => {
            data = data.map( (item)=> item.name ); 
            this.setState( { dataSource: data });
         });

    }

  render() {
    return (
      <div>
        <AutoComplete
          floatingLabelText="Enter your target repository"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.dataSource}
          maxSearchResults={5}
        />
      </div>
    );
  }
}

export default CreatePage;
