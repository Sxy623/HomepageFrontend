import React from 'react';
import axios from 'axios';

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false
    };
  }

  hide = () => {
    this.setState({
      isHidden: true
    })
  }

  render() {
    if (this.state.isHidden) {
      return null;
    }
    else {
      return (
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.age}</td>
          <td><button type='button' onClick={this.hide}>Delete</button></td>
        </tr>
      );
    }
  }
}

function List(props) {
  const listItems = props.items.map((item, index) =>
    <Item key={index} name={item.name} age={item.age} />
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {listItems}
      </tbody>
    </table>
  );
}

class NetworkTable extends React.Component {

  constructor(props) {
    super(props);
    this.api = 'http://39.107.66.30:3000/mock/11/test';
    this.state = null;
  }

  componentDidMount() {
    axios.get(this.api)
      .then(response => {
        this.setState({
          response: response
        })
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state?.response?.data?.status === 400) {
      return (
        <div>
          <h3>Failed!</h3>
        </div>
      );
    }
    else if (this.state?.response?.data?.status === 200) {
      return (
        <div>
          <h3>Success!</h3>
          <List items={this.state?.response?.data?.data} />
        </div>
      );
    }
    else {
      return (
        <div>
          <h1>Loading ...</h1>
        </div>
      );
    }
  }
}

export default NetworkTable;
