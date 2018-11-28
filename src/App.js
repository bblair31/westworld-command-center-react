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
    selectedHost: null,
    allMessages: []
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
    let message

    if (foundAreaHosts.length < foundArea.limit) {
      this.setState((prevState) => {
        return {hosts: prevState.hosts.map(host => {
          if (host.id === prevState.selectedHost) {
            message = {Notify: `${host.firstName} set in ${value}`}
            return {...host, area: value}
          } else {
            return host
          }
        }), allMessages:[message, ...prevState.allMessages]}
      })
    } else {
      this.setState(prevState => {
        let foundHost = prevState.hosts.find(host => host.id === prevState.selectedHost)
        let formattedArea = value.split('_').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')


        message = {Error: `Too many hosts. Cannot add ${foundHost.firstName} to ${formattedArea}`}
        return {allMessages: [message, ...prevState.allMessages]}
      })

    }
}

  toggleActive = (id) => {
    let message

    this.setState((prevState) => {
      return {hosts: prevState.hosts.map(host => {
        if (host.id === id && host.active === false) {
          message = {Warn: `Activated ${host.firstName}`}
          return {...host, active: true}
        } else if (host.id === id && host.active === true) {
          message = {Notify: `Decommissioned ${host.firstName}`}
          return {...host, active: false}
        } else {
          return host
        }
      }), allMessages:[message, ...prevState.allMessages]}
    })
  }

  filterActiveHosts = () => {
    return this.state.hosts.filter(host => host.active === true)
  }

  handleAllActivation = (event) => {
    let message

    if (event.target.innerText === "ACTIVATE ALL") {
      event.target.innerText = "DECOMMISSION ALL"
      event.target.style.backgroundColor= "green"
      message = {Warn: 'Activating all hosts!'}
      this.setState((prevState) => {
        return {hosts: prevState.hosts.map(host => {
          return {...host, active: true}
        }), allMessages:[message, ...prevState.allMessages]}
      })
    } else if (event.target.innerText === "DECOMMISSION ALL") {
      event.target.innerText = "ACTIVATE ALL"
      event.target.style.backgroundColor= "red"
      message = {Notify: 'Decommissiong all hosts.'}
      this.setState((prevState) => {
        return {hosts: prevState.hosts.map(host => {
          return {...host, active: false}
        }), allMessages:[message, ...prevState.allMessages]}
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
          allMessages={this.state.allMessages}
        />
      </Segment>
    )
  }
}

export default App;
