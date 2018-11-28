import '../stylesheets/HostInfo.css'
import React from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'

const cleanName = (name) => {
  return name.toLowerCase()
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

const dropdownOptions = (areas) => {
  return areas.map(area => {
    return {key: area.id, text: cleanName(area.name), value: area.name}
  })
}

const HostInfo = (props) => {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ props.host.imageUrl }
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {props.host.firstName} | { props.host.gender === "Male" ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={() => props.toggleActive(props.host.id)}
                  label={props.host.active === true ? "Active" :"Decommissioned"}
                  checked={true}
                  className="radio"
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={props.handleAreaChange}
                value={props.host.area}
                options={dropdownOptions(props.areas)}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
}

export default HostInfo
