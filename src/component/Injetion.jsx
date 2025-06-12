import React from 'react'
import TableContent from './TableContent'
import Divider from '@mui/material/Divider'
import { Gauge, PieChart } from '@mui/x-charts'
import { Note } from './CostAnalysis'
import { useSelector } from 'react-redux'

const Injetion = () => {

    const data = useSelector((state) => state.mForm.ingestion)
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
                                { id: 0, value: data[0].value - data[1].value, label: 'Success', color: "green" },
                                { id: 1, value: data[1].value, label: 'failure', color: "red" },
                            ],
                        },
                    ]}
                    width={90}
                    height={90}
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
        </div>
    )
}

export default Injetion