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
  }

  componentDidMount() {
    fetch(AREAS_URL)
      .then(response => response.json())
      .then(data => this.setState({
        areas: data
      }))
    fetch(HOSTS_URL)
      .then(response => response.json())
      .then(data => this.processData(data))
  }

  processData = (data) => {
    this.setState({
      hosts: data.map(host => {
        return {...host, selected:false}
      })
    })
  }

  findHost = (id) => {
    return this.state.hosts.find(host => host.id === id)
  }

  handleSelectHost = (id) => {
    let foundHost = this.findHost(id)

    const modifiedHosts =  [...this.state.hosts].map(host =>{
      if (host.id === foundHost.id) {
        return {...host, selected: true}
      } else {
        return {...host, selected: false}
      }
    })

    this.setState({
      hosts: modifiedHosts
    })
  }

  handleAreaChange = (e, {value}) => {
    this.setState((currentState) => {
      return currentState.hosts.map(host => {
        if (host.id === currentState.selectedHost) {
          return {...host, area: value}
        } else {
          return host
        }
      })
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap
          areas={this.state.areas}
          hosts={this.state.hosts}
          handleSelectHost={this.handleSelectHost}
        />
        <Headquarters
          areas={this.state.areas}
          hosts={this.state.hosts}
          handleSelectHost={this.handleSelectHost}
          handleAreaChange={this.handleAreaChange}
        />
      </Segment>
    )
  }
}

export default App;
