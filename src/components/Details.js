import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const renderSomething = (props) => {
  if (props.host) {
    return <HostInfo host={props.host} areas={props.areas} handleAreaChange={props.handleAreaChange} imageUrl={props.host.imageUrl} currentArea={props.host.area}/>
  } else {
    return <Image size='medium' src={Images.westworldLogo}/>
  }
}

const Details = (props) => {
  return(
    <Segment id="details" className="HQComps">
      {renderSomething(props)}
    </Segment>
  )
}

export default Details
