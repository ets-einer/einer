import { Route, Routes } from 'react-router-dom'
import React from 'react';

// This file implements File-System routing for the client react app,
// and you should not need to edit it. Includes code-splitting in the final bundle
// Made thanks to @oedotme on github!

type RoutesType = {
    [key: string]: { default: React.ElementType }
}

type PreservedRoutesType = {
    '404'?: React.ElementType
}

const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.tsx")
const PRESERVED: RoutesType = import.meta.glob('/src/pages/404.tsx', { eager: true })

export const routes = Object.keys(ROUTES).map((route) => {
    const path = route
        .replace(/\/src\/pages|index|\.tsx$/g, '')
        .replace(/\[\.{3}.+\]/, '*')
        .replace(/\[(.+)\]/, ':$1')

    return { path, component: React.lazy(ROUTES[route] as () => Promise<{ default: React.ComponentType }>), preload: ROUTES[route] }
})

const preserved: PreservedRoutesType = Object.keys(PRESERVED).reduce((preserved, file) => {
    const key = file.replace(/\/src\/pages\/|\.tsx$/g, '')
    return { ...preserved, [key]: PRESERVED[file].default }
}, {})

export const AppRoutes = () => {
    const NotFound = preserved?.['404']

    return (
        <React.Suspense fallback={'Loading...'}>
            <Routes>
                {routes.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={Component ? <Component /> : <></>} />
                ))}
                <Route path='*' element={NotFound ? <NotFound /> : <></>} />
            </Routes>
        </React.Suspense>
    )
}