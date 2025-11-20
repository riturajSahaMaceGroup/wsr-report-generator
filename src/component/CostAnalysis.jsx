import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import Divider from '@mui/material/Divider';
import TableContent from './TableContent';
import { useSelector } from 'react-redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useGetRagStatus from '../hooks/useGetRagStatus';
import { DateRender } from '../App';
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
        {
            title: `PTU Peak Alert Last triggered`,
            value: `${cost.PTU_Alert_Last_triggered}`
        },
        ]
    }, [cost])

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
                {/* <Note title={"PTU"} value={"Provisioned throughput units"} /> */}
            </div>
            <Divider orientation='vertical' sx={{ background: "#ed816680" }} />
            <div style={{
                display: "flex",
                flex: .5,
            }}>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: cost.spent, label: 'Actual Cost Per week', color: "#867c8a" },
                                { id: 1, value: cost.budget - cost.spent, label: 'Budget Per week: ', color: "#f1d4dc" },
                            ],
                        },
                    ]}
                    width={100}
                    height={60}
                />
            </div>

            <RAG_STATUS status={useGetRagStatus("cost")} />
        </div>
    )
}

export default CostAnalysis