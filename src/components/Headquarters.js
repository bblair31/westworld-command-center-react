import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'

class Headquarters extends Component {

  filterInactiveHosts = () => {
    return this.props.hosts.filter(host => host.active === false)
  }

  getSelectedHost = () => {
    return this.props.hosts.find(host => host.id === this.props.selectedHost)
  }

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage
            hosts={this.filterInactiveHosts()}
            selectedHost={this.props.selectedHost}
            handleSelectHost={this.props.handleSelectHost}
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Details
            host={this.getSelectedHost()}
            areas={this.props.areas}
            handleAreaChange={this.props.handleAreaChange}
            toggleActive={this.props.toggleActive}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel
            handleAllActivation={this.props.handleAllActivation}
            allMessages={this.props.allMessages}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
