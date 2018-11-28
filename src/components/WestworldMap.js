import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

const filterByArea = (props,area) => {
  return props.hosts.filter(host => host.area === area.name)
}


const WestworldMap = (props) => {
  return (
    <Segment id="map" >
      {props.areas.map(area => {
        return <Area
          key={area.id}
          area={area}
          areaHosts={filterByArea(props, area)}
          selectedHost={props.selectedHost}
          handleSelectHost={props.handleSelectHost}
        />
      })}
    </Segment>
  )
}

export default WestworldMap
