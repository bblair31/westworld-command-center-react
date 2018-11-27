import '../stylesheets/HostInfo.css'
import React from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'

const cleanName = (name) => {
  return name.toLowerCase()
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

const dropdownOptions = (props) => {
  return props.areas.map(area => {
    return {key: area.id, text: cleanName(area.name), value: area.name}
  })
}

const toggle = () => {
  console.log("The radio button fired");
}

const HostInfo = (props) => {

    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ props.imageUrl }
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {"Bob"} | { true ? <Icon name='man' /> : <Icon name='woman' />}
                { /* Think about how the above should work to conditionally render the right First Name and the right gender Icon */ }
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={() => toggle()}
                  label={"Active"}
                  // {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
                  checked={true}
                  // {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
                  className="radio"
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={props.handleAreaChange}
                value={props.currentArea}
                options={dropdownOptions(props)}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
}

export default HostInfo
