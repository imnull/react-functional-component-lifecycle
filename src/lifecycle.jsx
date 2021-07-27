import React, { useEffect, useState, useRef } from 'react'

const highComp = Comp => {
    return props => {
        const {
            show = true,
            onMount, onReady, onLoad, onShow, onHide, onUnmount,
            ...rest
        } = props
        const [mounted, setMounted] = useState(0)
        const [ready, setReady] = useState(0)
        const [load, setLoad] = useState(0)
        const [showing, setShow] = useState(0)
        const ref = useRef()
    
    
        useEffect(() => {
            if(mounted === 1) {
                console.log('onMount')
                typeof onMount === 'function' && onMount()
                setReady(1)
            }
        }, [mounted])
    
        useEffect(() => {
            if(ready === 1 && ref.current) {
                console.log('onReady')
                typeof onReady === 'function' && onReady()
                setLoad(1)
            }
        }, [ready, ref])
    
        useEffect(() => {
            if(load === 1) {
                console.log('onLoad')
                typeof onLoad === 'function' && onLoad()
                setShow(1)
            }
        }, [load])
    
        useEffect(() => {
            if(showing === 1) {
                console.log('onShow')
                typeof onShow === 'function' && onShow()
            } else if(showing === 2) {
                console.log('onHide')
                typeof onHide === 'function' && onHide()
            }
        }, [showing])
    
        useEffect(() => {
            setMounted(1)
            return () => {
                setShow(2)
                setLoad(2)
                setReady(2)
                setMounted(2)
                console.log('onUnmount')
                typeof onUnmount === 'function' && onUnmount()
            }
        }, [])
    
        useEffect(() => {
            if(showing === 0 && show) {
            } else if(showing === 1 && !show) {
                setShow(2)
            } else if(showing === 2 && show) {
                setShow(1)
            }
        }, [show])
        return show ? <Comp ref={ref} { ...rest } /> : null
    }
}

export default highComp