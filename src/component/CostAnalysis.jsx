import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import Divider from '@mui/material/Divider';
import TableContent from './TableContent';
import { useSelector } from 'react-redux';
export const Note = (props)=>{
    const {title,value} = props
    return <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"start",
        boxShadow: "0 0 14px rgb(247, 197, 105)",
        padding:"5px",
        width:"90%",
        color:"black",
        marginTop:"15px"
    }}>
        <span style={{ fontSize: "10px", fontWeight: "bold" }}>
            <span style={{ fontSize: "10px", fontWeight: "bold" }}>Note: </span></span>
        <span style={{ fontSize: "10px", fontWeight: "bold" }}>{`${title}: `} <span>{`${value}`}</span></span>
    </div>
}
const CostAnalysis = () => {    
    const cost = useSelector((state)=> state.mForm.cost)
    const info = React.useMemo(()=>{
       return [{
            title: `Actual Cost Per week`,
            value: `€${cost.spent}`
        },
        {
            title: `Budget Per week`,
            value: `€${cost.budget}`
        },
        {
            title: `PTU Peak Alert Last triggered`,
            value: `${cost.PTU_Alert_Last_triggered}`
        },
        ]
    },[cost])
   

    return (
        <div style={{
            display: "flex",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: .5,
                alignItems: "start",
                fontSize: "14px"
            }}>

                {
                    info.map((item, idx) => {
                        return <TableContent title={item.title} value={item.value} key={idx} />
                    })
                }
                {/* <div style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"start",
                    boxShadow: "0 0 14px rgb(247, 197, 105)",
                    padding:"5px",
                    width:"90%",
                    color:"black",
                    marginTop:"15px"
                }}>
                    <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                        <span style={{ fontSize: "10px", fontWeight: "bold" }}>Note: </span></span>
                    <span style={{ fontSize: "10px", fontWeight: "bold" }}>PTU: <span>Provisioned throughput units</span></span>
                </div> */}
                <Note title = {"PTU"} value={"Provisioned throughput units"}/>
            </div>
            <Divider orientation='vertical' sx={{background:"#ed816680"}} />
            <div style={{
                display: "flex",
                flex: .5,
            }}>
                <PieChart

                    series={[
                        {
                            data: [
                                { id: 0, value: cost.spent, label: 'Actual Cost Per week', color: "green" },
                                { id: 1, value: cost.budget, label: 'Budget Per week: ', color: "blue" },
                            ],
                        },
                    ]}
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}

export default CostAnalysis