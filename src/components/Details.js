import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const Details = (props) => {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  const renderSomething = (props) => {
    console.log('in Details', props);
    const selectHostObj = props.hosts.find(host => host.id === props.selectedHost)
    console.log('in Details', selectHostObj);

    if (props.selectedHost) {
      return <HostInfo selectedHost={props.selectedHost} areas={props.areas} handleAreaChange={props.handleAreaChange} imageUrl={selectHostObj.imageUrl} currentArea={selectHostObj.area}/>
    } else {
      return <Image size='medium' src={Images.westworldLogo}/>
    }
  }

  return(
    <Segment id="details" className="HQComps">
      {renderSomething(props)}
    </Segment>
  )
}

export default Details
