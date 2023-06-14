import React from 'react'

interface Props {
    args: string[]
}

export const FormHook = (props : {args: string[]}) => {
    return (
        <div>
           {props.args} 
        </div>
    )
}
