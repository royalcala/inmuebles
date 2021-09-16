import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
const Public = {
    list: React.lazy(() => import('./Public.List'))
}
const Catalog = {
    company: {
        new: React.lazy(() => import('./Catalog.company.new')),
        edit: React.lazy(() => import('./Catalog.company.edit')),
        list: React.lazy(() => import('./Catalog.company.list')),
    },
    property: {
        new: React.lazy(() => import('./Catalog.property.new')),
        edit: React.lazy(() => import('./Catalog.property.edit')),
        list: React.lazy(() => import('./Catalog.property.list')),
    }
}
function LazyComponent({ Component }: any) {
    return (
        <div>
            <React.Suspense fallback={<div>Loading...</div>} >
                <Component />
            </React.Suspense>
        </div>
    );
}
//TODO warning each child in a list have a unique key. React.Children.toArray()
export default function Routes() {

    return (
        <Switch>
            <Route path="/public/list" key={0}>
                <LazyComponent Component={Public.list} />
            </Route>
            <Route path="/catalogs/company/new" key={1}>
                <LazyComponent Component={Catalog.company.new} />
            </Route>
            <Route path="/catalogs/company/edit/:id">
                <LazyComponent Component={Catalog.company.edit} />
            </Route>
            <Route path="/catalogs/company/list">
                <LazyComponent Component={Catalog.company.list} />
            </Route>
            <Route path="/catalogs/property/new">
                <LazyComponent Component={Catalog.property.new} />
            </Route>
            <Route path="/catalogs/property/edit">
                <LazyComponent Component={Catalog.property.edit} />
            </Route>
            <Route path="/catalogs/property/list">
                <LazyComponent Component={Catalog.property.list} />
            </Route>
            <Route path="/">
                <LazyComponent Component={Public.list} />
            </Route>

        </Switch>
    )
}