import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link as RouterLink, LinkProps } from 'react-router-dom'

import { routes } from './routes'

// This is the recommended Link component to use when making Links for your application,
// since it will by default prefetch links on the viewport, resulting in faster page navigation 
// (HIGHLY RECOMMENDED, HELPS SOLVE CODE-SPLITTING LESS FAST NAVIGATION).
// ** Same API as the ReactRouter <Link> Component. **
// Made thanks to @oedotme on github!

const getMatchingRoute = (path: string) => {
    const routeDynamicSegments = /:\w+|\*/g
    return routes.find((route) => path.match(new RegExp(route.path.replace(routeDynamicSegments, '.*')))?.[0] === path)
}

type Props = LinkProps & { prefetch?: boolean }

export const Link = ({ children, to, prefetch = true, ...props }: Props) => {
    const ref = useRef<HTMLAnchorElement>(null)
    const [prefetched, setPrefetched] = useState(false)

    const route = useMemo(() => getMatchingRoute(to as string), [to])
    const preload = useCallback(() => route?.preload() && setPrefetched(true), [route])
    const prefetchable = Boolean(route && !prefetched)

    useEffect(() => {
        if (prefetchable && prefetch && ref?.current) {
            const observer = new IntersectionObserver(
                (entries) => entries.forEach((entry) => entry.isIntersecting && preload()),
                { rootMargin: '200px' }
            )

            observer.observe(ref.current)
            return () => observer.disconnect()
        }
    }, [prefetch, prefetchable, preload])

    return (
        <RouterLink ref={ref} to={to} {...props}>
            {children}
        </RouterLink>
    )
}