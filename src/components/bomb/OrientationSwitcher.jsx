// credits: https://github.com/trekhleb/trekhleb.github.io/blob/master/src/posts/2021/gyro-web/components/OrientationSwitcher.tsx
import React, { useState } from "react"

import { useDeviceOrientation } from "./useDeviceOrientation"

const OrientationSwitcher = props => {
  const {
    onToggle: onSwitchToggle,
    labelOn = "Using orientation",
    labelOff = "Use orientation"
  } = props

  const { error, requestAccess, revokeAccess } = useDeviceOrientation()

  const [orientationAvailable, setOrientationAvailable] = useState(false)

  const onToggle = toggleState => {
    if (toggleState) {
      requestAccess().then(granted => {
        if (granted) {
          setOrientationAvailable(true)
        } else {
          setOrientationAvailable(false)
        }
      })
    } else {
      revokeAccess().then(() => {
        setOrientationAvailable(false)
      })
    }
    onSwitchToggle(toggleState)
  }

  const errorElement = error ? (
    <div>
      <span>{error.message}</span>
    </div>
  ) : null

  return (
    <div>
      <input type="checkbox"
        onChange={onToggle}
        checked={orientationAvailable}
      />
      {errorElement}
    </div>
  )
}

export default OrientationSwitcher