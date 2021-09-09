import React from 'react'
import withContainer from './withContainer'
function EditProperty() {

    return (
        <div>new Property</div>
    )
}

export default withContainer(EditProperty, ["Catalogos", "Propiedades", "Lista"]) as any