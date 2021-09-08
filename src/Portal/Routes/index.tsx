import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
const PublicList = React.lazy(() => import('./Public.List'));

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
                <LazyComponent Component={PublicList} />
            </Route>
            <Route path="/">
                <LazyComponent Component={PublicList} />
            </Route>
        </Switch>
    )
}