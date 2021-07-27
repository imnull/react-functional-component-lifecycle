import React, { useState, forwardRef } from 'react'
import LifeCycle from './lifecycle'

const Item = LifeCycle(forwardRef((props, ref) => (<div ref={ref} { ...props }>
    Life cycle
</div>)))

export default (props) => {

    const [compShow, setCompShow] = useState(true)
    const [compLoad, setCompLoad] = useState(true)

    return (<>
        <h1>React Lifecycle</h1>
        <button onClick={() => setCompShow(!compShow)}>{compShow ? `隐藏组件` : `显示组件`}</button>
        <button onClick={() => setCompLoad(!compLoad)}>{compLoad ? `卸载组件` : `装载组件`}</button>
        {compLoad ? <Item show={compShow} /> : null}
    </>)
}