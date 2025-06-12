import React from 'react'

const TableContent = (props) => {
    const { title, value } = props
    return (
        <div>
            {console.log("value: "+value)}
            <span style={{
                fontWeight:"bold",
                fontSize:"12px"
            }}>{`${title} : `}</span>
            <span  style={{
                fontWeight:"bold",
                fontSize:"14px"
            }}>{value}</span>
        </div>
    )
}

export default TableContent