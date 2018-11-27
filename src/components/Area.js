import React from 'react';
import '../stylesheets/Area.css'

const cleanName = (name) => {
  return name.toLowerCase()
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

const Area = ({ area }) => (

  <div className='area' id={area.name}>
    <h3 className='labels'>{cleanName(area.name)}</h3>

    {/* See Checkpoint 1 item 2 in the Readme for a clue as to what goes here */}

  </div>

)

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
