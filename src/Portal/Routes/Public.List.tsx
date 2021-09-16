import React from 'react'
import withContainer from './withContainer'
function PublicList() {
    return (
        <div>Public List Properties</div>
    )
}

export default withContainer(PublicList,["Public","List"]) as any