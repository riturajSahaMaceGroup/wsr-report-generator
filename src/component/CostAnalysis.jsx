import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import Divider from '@mui/material/Divider';
import TableContent from './TableContent';
import { useSelector } from 'react-redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useGetRagStatus from '../hooks/useGetRagStatus';
import { DateRender } from '../App';
import { extractNumber } from '../hooks/useGetRagStatus';
export const Note = (props) => {
    const { title, value } = props
    return <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        boxShadow: "0 0 14px rgb(247, 197, 105)",
        padding: "5px",
        width: "90%",
        color: "black",
        marginTop: "15px"
    }}>
        <span style={{ fontSize: "10px", fontWeight: "bold" }}>
            <span style={{ fontSize: "10px", fontWeight: "bold" }}>Note: </span></span>
        <span style={{ fontSize: "10px", fontWeight: "bold" }}>{`${title}: `} <span>{`${value}`}</span></span>
    </div>
}

export const RAG_STATUS = ({ status }) => {
    // Map status to Material UI color
    const getColor = (status) => {
        switch (status) {
            case 'R':
                return 'error'; // red
            case 'A':
                return 'warning'; // amber
            case 'G':
                return 'success'; // green
            default:
                return 'disabled'; // default gray
        }
    };

    return <div style={{
        position: "relative",
        right: "30px"
    }}><BookmarkIcon color={getColor(status)} /></div>
};

const CostAnalysis = () => {
    const cost = useSelector((state) => state.mForm.cost)

    const info = React.useMemo(() => {
        return [{
            title: `Actual Cost Per week`,
            value: `€${cost.spent}`
        },
        {
            title: `Budget Per week`,
            value: `€${cost.budget}`
        },
        
        ]
    }, [cost])

    return (
        <div style={{
            display: "flex",
            minHeight: "70px",
            alignItems: "center",
            margin: "1px",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                fontSize: "14px",
                flex: "1 1 0",
            }}>

                {
                    info.map((item, idx) => {
                        return <TableContent title={item.title} value={item.value} key={idx} />
                    })
                }
                {/* <Note title={"PTU"} value={"Provisioned throughput units"} /> */}
            </div>
            <Divider orientation='vertical' sx={{ background: "#ed816680" }} />
            <div style={{
                display: "flex",
                flex: "0 0 130px",
                alignItems: "center",
            }}>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: extractNumber(cost.spent), label: 'Actual', color: "#867c8a" },
                                { id: 1, value: extractNumber(cost.budget) - extractNumber(cost.spent), label: 'Remaining', color: "#f1d4dc" },
                            ],
                        },
                    ]}
                    slotProps={{ legend: { direction: "horizontal", sx: { fontSize: "10px" } } }}
                    width={130}
                    height={70}
                />
            </div>

            <RAG_STATUS status={useGetRagStatus("cost")} />
        </div>
    )
}

export default CostAnalysis