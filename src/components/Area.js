import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const cleanName = (name) => {
  return name.toLowerCase()
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}


const Area = (props) => {
  return (
    <div className='area' id={props.area.name}>
      <h3 className='labels'>{cleanName(props.area.name)}</h3>
      <HostList
        hosts={props.areaHosts}
        handleSelectHost={props.handleSelectHost}
        selectedHost={props.selectedHost}
      />
    </div>
  )
}

// Area.propTypes = {
//   hosts: function(props, propName, componentName){
//     if(props.hosts.length > props.limit){
//       throw Error(
//         `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
//       )
//     }
//   }
// }

export default Area;
