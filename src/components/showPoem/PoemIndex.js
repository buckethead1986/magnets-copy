import React from "react";
import PoemIndexCard from "./PoemIndexCard";
import Columns from "react-columns";
// import { GridList, GridTile } from "material-ui/GridList";

// const styles = {
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//     col: 3
//   },
//   gridList: {
//     width: 600,
//     cols: 3,
//     overflowY: "auto"
//   }
// };

// var queries = [
//   {
//     columns: 2,
//     query: "min-width: 500px"
//   },
//   {
//     columns: 3,
//     query: "min-width: 1000px"
//   }
// ];

class PoemIndex extends React.Component {
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     relationships: []
  //   };
  // }
  // componentWillMount() {
  //   this.setState({
  //     relationships: this.props.relationships
  //   });
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.relationships !== nextProps.relationships) {
  //     this.setState({
  //       relationships: nextProps.relationships
  //     });
  //   }
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   debugger;
  //   return this.props.relationships !== nextProps.relationships;
  // }

  render() {
    const poems = this.props.poems.map((poem, index) => {
      return (
        <div key={index}>
          <PoemIndexCard
            columns={4}
            showPoem={this.props.showPoem}
            url={this.props.url}
            currUser={this.props.currUser}
            users={this.props.users}
            poem={poem}
            followUser={this.props.followUser}
            unFollowUser={this.props.unFollowUser}
            relationships={this.props.relationships}
            favoritePoem={this.props.favoritePoem}
            unFavoritePoem={this.props.unFavoritePoem}
            favorites={this.props.favorites}
          />
          <br />
        </div>
      );
    });
    return <Columns columns={4}>{poems}</Columns>;
  }
}

export default PoemIndex;
