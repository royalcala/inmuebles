import React from 'react'
import withContainer from './withContainer'
function NewProperty() {

    return (
        <div>new Property</div>
    )
}

export default withContainer(NewProperty, ["Catalogos", "Propiedades", "Nueva"]) as any