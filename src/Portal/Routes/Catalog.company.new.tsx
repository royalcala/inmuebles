import React from 'react'
import withContainer from './withContainer'
import withLogin from './withLogin'
function New() {

    return (
        <div>new Property</div>
    )
}

export default
    withLogin(
        withContainer(New, ["Catalogos", "Empresas", "Nueva"])
    )