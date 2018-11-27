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
    selectedHost: {}
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
    let foundHost = this.state.hosts.find(host => host.id === id)
    this.setState({
      selectedHost: foundHost
    }, () => console.log(this.state.selectedHost))
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
          hosts={this.state.hosts}
          selectedHost={this.state.selectedHost}
          handleSelectHost={this.handleSelectHost}
        />
      </Segment>
    )
  }
}

export default App;
