import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {
  return(
    <Card
      className={props.selectedHost.id === props.host.id ? "host selected" : "host"}
      onClick={() => props.handleSelectHost(props.host.id)}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host
