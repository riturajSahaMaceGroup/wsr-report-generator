import React from 'react'
import TableContent from './TableContent'
import { BarChart } from '@mui/x-charts'
import { useSelector } from 'react-redux'

const GithubSummary = () => {
    const data = useSelector((state)=> state.mForm.githubSummary)

    const categories = React.useMemo(()=>data.current_week.map(item => item.title), [data]);
    const currentWeekValues = React.useMemo(() => data.current_week.map(item => item.value), [data]);
    const prevWeekValues = React.useMemo(() => data.prev_week.map(item => item.value), [data]);
    const prevPrevWeekValues = React.useMemo(() => data.prev_prev_week.map(item => item.value), [data]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{
                display: "flex",
                gap: "5px"
            }}>
                {data.current_week.map((item, idx) => {
                    return <div>
                        <TableContent
                            title={item.title}
                            value={item.value}
                        >
                        </TableContent></div>
                })}
            </div>

            <BarChart
                xAxis={[{ id: 'categories', data: categories, scaleType: 'band' }]}
                series={[
                    { data: currentWeekValues, label: 'Current Week', color: '#1976d2' },
                    { data: prevWeekValues, label: 'Previous Week', color: '#2e7d32' },
                    { data: prevPrevWeekValues, label: 'Two Weeks Prior', color: '#d32f2f' }
                ]}

                width={500}
                height={230}
            />

        </div>
    )
}

export default GithubSummary