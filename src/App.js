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
      .then(data => this.setState({hosts: data}))
  }

  findHost = (id) => {
    return this.state.hosts.find(host => host.id === id)
  }

  handleSelectHost = (id) => {
    let foundHost = this.findHost(id)

    this.setState({
      selectedHost: foundHost.id
    })
  }

  handleAreaChange = (e, {value}) => {
    this.setState((prevState) => {
      return {hosts: prevState.hosts.map(host => {
        if (host.id === prevState.selectedHost) {
          return {...host, area: value}
        } else {
          return host
        }
      })}
    })
  }

  toggleActive = (id) => {
    this.setState((prevState) => {
      return {hosts: prevState.hosts.map(host => {
        if (host.id === id && host.active === false) {
          return {...host, active: true}
        } else if (host.id === id && host.active === true) {
          return {...host, active: false}
        } else {
          return host
        }
      })}
    })
  }

  filterActiveHosts = () => {
    return this.state.hosts.filter(host => host.active === true)
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap
          areas={this.state.areas}
          hosts={this.filterActiveHosts()}
          selectedHost={this.state.selectedHost}
          handleSelectHost={this.handleSelectHost}
        />
        <Headquarters
          areas={this.state.areas}
          hosts={this.state.hosts}
          selectedHost={this.state.selectedHost}
          handleSelectHost={this.handleSelectHost}
          handleAreaChange={this.handleAreaChange}
          toggleActive={this.toggleActive}
        />
      </Segment>
    )
  }
}

export default App;
