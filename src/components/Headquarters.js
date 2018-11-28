import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'

class Headquarters extends Component {

  filterInactiveHosts = () => {
    return this.props.hosts.filter(host => host.active === false)
  }

  getSelectedHost = () => {
    return this.props.hosts.find(host => host.selected === true)
  }

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage
            hosts={this.filterInactiveHosts()}
            handleSelectHost={this.props.handleSelectHost}
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Details
            host={this.getSelectedHost()}
            areas={this.props.areas}
            handleAreaChange={this.props.handleAreaChange}
          />
        </Grid.Column>
        <Grid.Column width={3}>

        {/* and here. Take visual cues from the screenshot/video in the Readme. */}

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
