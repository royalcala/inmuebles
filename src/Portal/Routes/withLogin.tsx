import React from 'react'
import { GlobalContext } from '../../App'


function PageRequireLogin() {
    return (
        <div>Requires login</div>
    )
}


const withLogin = (Component: React.ElementType) => (props: any) => {
    const globalContext = React.useContext(GlobalContext)

    if (globalContext.user)
        return <Component />
    else
        return <PageRequireLogin />
}


export default withLogin