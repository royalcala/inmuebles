import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
const Public = {
    list: React.lazy(() => import('./Public.List'))
}
const Catalog = {
    properties: {
        new: React.lazy(() => import('./Catalog.property.new'))
    }
}
function LazyComponent({ Component }: any) {
    return (
        <div>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Component />
            </React.Suspense>
        </div>
    );
}
export default function Routes() {
    return (
        <Switch>
            <Route path="/public/list">
                <LazyComponent Component={Public.list} />
            </Route>
            <Route path="/catalogs/property/new">
                <LazyComponent Component={Catalog.properties.new} />
            </Route>
            <Route path="/">
                <LazyComponent Component={Public.list} />
            </Route>
        </Switch>
    )
}