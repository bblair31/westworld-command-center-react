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
    let foundArea = this.state.areas.find(area => area.name === value)
    let foundAreaHosts = this.state.hosts.filter(host => host.area === foundArea.name)

    if (foundAreaHosts.length < foundArea.limit) {
      this.setState((prevState) => {
        return {hosts: prevState.hosts.map(host => {
          if (host.id === prevState.selectedHost) {
            return {...host, area: value}
          } else {
            return host
          }
        })}
      })
    } else {
      alert("This area is full")
    }
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

  handleAllActivation = (event) => {
    if (event.target.innerText === "ACTIVATE ALL") {
      event.target.innerText = "DECOMMISSION ALL"
      event.target.style.backgroundColor= "green"
      this.setState((prevState) => {
        return {hosts: prevState.hosts.map(host => {
          return {...host, active: true}
        })}
      })
    } else if (event.target.innerText === "DECOMMISSION ALL") {
      event.target.innerText = "ACTIVATE ALL"
      event.target.style.backgroundColor= "red"
      this.setState((prevState) => {
        return {hosts: prevState.hosts.map(host => {
          return {...host, active: false}
        })}
      })
    }
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
          handleAllActivation={this.handleAllActivation}
        />
      </Segment>
    )
  }
}

export default App;
