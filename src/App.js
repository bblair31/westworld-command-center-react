import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'

const AREAS_URL = 'http://localhost:4000/areas'
const HOSTS_URL = 'http://localhost:4000/hosts'


class App extends Component {
  state = {
    areas: [],
    hosts: [],
    selectedHost: null
  }

  componentDidMount() {
    fetch(AREAS_URL)
      .then(response => response.json())
      .then(data => this.setState({
        areas: data
      }))
    fetch(HOSTS_URL)
      .then(response => response.json())
      .then(data => this.setState({
        hosts: data
      }))
  }

  handleSelectHost = (id) => {
    this.setState({
      selectedHost: id
    }, () => console.log(this.state.selectedHost))
  }

  handleAreaChange = (e, {value}) => {
    // debugger;
    this.setState((currentState) => {
      return currentState.hosts.map(host => {
        if (host.id === currentState.selectedHost) {
          return {...host, area: value}
        } else {
          return host
        }
      })
    }, ()=>console.log(this.state))
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap
          areas={this.state.areas}
          selectedHost={this.state.selectedHost}
          handleSelectHost={this.handleSelectHost}
        />
        <Headquarters
          areas={this.state.areas}
          hosts={this.state.hosts}
          selectedHost={this.state.selectedHost}
          handleSelectHost={this.handleSelectHost}
          handleAreaChange={this.handleAreaChange}
        />
      </Segment>
    )
  }
}

export default App;
