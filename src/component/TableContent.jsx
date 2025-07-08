import React from 'react'

const TableContent =
    React.memo((props) => {
        const { title, value } = props;
        // console.log("value: " + value);
        return (
            <div>
                <span style={{ fontWeight: "bold", fontSize: "12px" }}>{`${title} : `}</span>
                <span style={{ fontWeight: "bold", fontSize: "14px" }}>{value}</span>
            </div>
        );
    });


export default TableContent