import React from 'react'
import withContainer from './withContainer'
import withLogin from './withLogin'
import { createCompany } from '../../graphql/mutations'
import { API } from 'aws-amplify';
import { CreateCompanyMutation } from '../../API'
import { useHistory } from "react-router-dom";
import FormEdit, { DataType } from '../../Components/Form.Edit'

function New() {
    let history = useHistory();
    return (
        <FormEdit
            onFetch={async () => {
                const data: DataType = {
                    Detalles: {
                        fields: [
                            {
                                label: "Nombre Empresa", name: "name", rules: { required: 'Nombre requerido' }
                            },
                        ]
                    }
                }
                return data
            }}
            onSubmit={async (input: any) => {
                const data = await API.graphql({ query: createCompany, variables: { input } }) as { data: CreateCompanyMutation }
                console.log(data.data.createCompany)
                history.push('/catalogs/company/edit/' + data.data.createCompany?.id)
            }}
        />
    )
}

export default
    withLogin(
        withContainer(New, ["Catalogos", "Empresas", "Nueva"])
    )