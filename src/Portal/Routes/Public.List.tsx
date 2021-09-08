import React from 'react'
import withContainer from './withContainer'
function PublicList() {
    return (
        <div>Hi</div>
    )
}

export default withContainer(PublicList,["Public","List"]) as any