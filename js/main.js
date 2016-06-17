var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var TableRow = React.createClass({
  render: function(){
    return (
      <tr>
        <td>{this.props.value + 1}</td>
        <td><img src={this.props.obj.img} />
        <a href={"https://www.freecodecamp.com/" + this.props.obj.username} target="_blank">{this.props.obj.username}</a></td>
        <td>{this.props.obj.recent}</td>
        <td>{this.props.obj.alltime}</td>
      </tr>
    )
  }
});

var MainTable = React.createClass({
  getInitialState: function(){
    return {
      content: [],
      allTimeContent: [],
      recentContent: []
    }
  },

  componentDidMount: function(){
    this.serverRequest = $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function(result) {
      this.setState({
        recentContent: result,
        content: result
      });
    }.bind(this));
    this.secondRequest = $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function(result) {
      this.setState({
        allTimeContent: result
      });
    }.bind(this));
  },

  componentWillReceiveProps: function(){
    var alltime = this.state.allTimeContent;
    var recent = this.state.recentContent;
    if (this.props.display === "alltime") {
      this.setState({
        content: recent
      });
    } else if (this.props.display === 'recent'){
      this.setState({
        content: alltime
      });
    }
  },

  componentWillUnmount: function(){
    this.serverRequest.abort();
  },

  render: function(){
    return (
        <tbody>
          {this.state.content.map(function(object, i){
            return <TableRow obj = {object} value={i} key={i}/>;
          })}
        </tbody>
    )
  }
});

var Table = React.createClass({
  getInitialState: function(){
    return {
      display: "recent",
      recentClass: 'selected',
      alltimeClass: 'not-selected'
    };
  },

  changeToRecent: function(){
    if (this.state.display === 'alltime') {
      this.setState({
        display: 'recent',
        recentClass: 'selected',
        alltimeClass: 'not-selected'
      });
    }
  },

  changeToAlltime: function(){
    if (this.state.display === 'recent') {
      this.setState({
        display: "alltime",
        recentClass: 'not-selected',
        alltimeClass: 'selected'
      });
    }
  },

  render: function(){
    return (
      <table className="table table-bordered">
        <caption>Leaderboard</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th onClick={this.changeToRecent} className={this.state.recentClass}>Points in past 30 days</th>
            <th onClick={this.changeToAlltime} className={this.state.alltimeClass}>All time points</th>
          </tr>
        </thead>
        <MainTable display={this.state.display} />
      </table>
    );
  }
});
ReactDOM.render(<Table />, document.getElementById("app"));
