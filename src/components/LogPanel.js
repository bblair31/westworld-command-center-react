import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = (props) => {
  const logs = (allMessages) => {
    return allMessages.map(message => {
      let key = Object.keys(message).join('').toLowerCase()
      let value = Object.values(message).join('')

      if (key === "notify") {
        return Log.notify(value)
      } else if (key === "warn") {
        return Log.warn(value)
      } else if (key === "error") {
        return Log.error(value)
      }
    })
  }

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs(props.allMessages).map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>

      <Button
        fluid
        onClick={props.handleAllActivation}
        color={"red"}
        content={"ACTIVATE ALL"}
      />
    </Segment>
  )
}

export default LogPanel
