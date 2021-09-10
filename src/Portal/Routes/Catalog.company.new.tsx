import React from 'react'
import withContainer from './withContainer'
import withLogin from './withLogin'
import FormOne, { PropsFormOne } from '../../Components/Form.One'
function New() {
    const data: PropsFormOne = {
       fields:[
           {label:"Nombre Empresa",nameDB:"name"},
       ] 
    }
    return (
        <FormOne
            data={{ ...data }}
        />
    )
}

export default
    withLogin(
        withContainer(New, ["Catalogos", "Empresas", "Nueva"])
    )