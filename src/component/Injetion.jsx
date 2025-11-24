import React from 'react'
import TableContent from './TableContent'
import Divider from '@mui/material/Divider'
import { Gauge, PieChart } from '@mui/x-charts'
import { Note, RAG_STATUS } from './CostAnalysis'
import { useSelector } from 'react-redux'
import useGetRagStatus from '../hooks/useGetRagStatus'

const Injetion = ({type}) => {

    const data = type=='construct'? useSelector((state) => state.mForm.ingestion):useSelector((state) => state.mForm.ingestion_consult)
    return (
        <div style={{
            display: "flex",
            // width:"100%"
            flex: 1
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: .5,
                alignItems: "start",
                fontSize: "14px"
            }}>
                {data.map((item, idx) => {
                    return <TableContent title={item.title} value={item.value} key={idx} />
                })}

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
                                { id: 0, value: data[0].value - data[1].value, label: 'Success', color: "#b5b0b3" },
                                { id: 1, value: data[1].value, label: 'Failure', color: "#6c645f" },
                            ],
                        },
                    ]}
                    width={90}
                    height={70}
                />
                {/* <Gauge
                    value={75}
                    startAngle={0}
                    endAngle={360}
                    innerRadius="80%"
                    outerRadius="100%"
                    text={({ value, valueMax }) => `${data[0].value-data[1].value} / ${data[0].value}`}
                    width={200}
                    height={100}
                /> */}
            </div>
            <RAG_STATUS status={useGetRagStatus(`${type=="construct"? "dataIngestion":"dataIngestion_consult"}`)} />
        </div>
    )
}

export default Injetion