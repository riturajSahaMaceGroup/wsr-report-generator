import React from 'react'
import TableContent from './TableContent'
import { BarChart, LineChart } from '@mui/x-charts'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'

const Usage = () => {

  const usage = useSelector((state)=> state.mForm.usage)
   
  const dataPrep = React.useMemo(() => {
    let mprep = [];
    Object.keys(usage).forEach((val) => {
      const asked = usage[val]["Questions Asked"];
      const blocked = usage[val]["Blocked (PII)"];
      const tempObj = {
        title: val == 'week_0' ? "curr. week" : val == "week_1" ? "Week -1" : "week -2",
        asked,
        blocked,
        success: asked - blocked,
        fail: blocked
      };
      mprep.push(tempObj);
    });
    return mprep
  },[usage])


  const responseTimes = React.useMemo(() => [
    parseFloat(usage.week_2["Avg. Response Time"].replace(" sec", "")),
    parseFloat(usage.week_1["Avg. Response Time"].replace(" sec", "")),
    parseFloat(usage.week_0["Avg. Response Time"].replace(" sec", ""))
  ], [usage]);

  return (
    <div style={{
      display: "flex",
      // width:"100%"
      alignItems: "center",
      flexDirection: "column"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: .4,
        alignItems: "center",
        fontSize: "14px",
        justifyContent: "center",
        width: "100%"
      }}>
        {Object.keys(usage.week_0).map((value, idx) => {
          return <TableContent title={value} value={usage.week_0[value]} key={idx}></TableContent>
        })}


      </div>
      <Divider sx={{width: "100%",background:"#ed816680"}} />
      <div style={{
        display: "flex",
        flex: .6,
        // flexDirection: "column"
        width: "100%",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          flex: .5
        }}>
          <span>Avg Response time</span>
          <LineChart
            xAxis={[{ scaleType: 'point', data: ['Week Prev. -1', 'Prev. Week', 'Curr. Week'] }]}
            series={[
              {
                label: 'Avg. Response Time (sec)',
                data: responseTimes
              },
            ]}
            height={100}
            margin={{ left: 0, right: 50, top: 20, bottom: 30 }}
          />
        </div>
        {/* <span>Usage</span>
        <BarChart
          xAxis={[{
            data: prepData.map(item => item.title),
            categoryGapRatio: 0.9,
            barGapRatio: 0.9,
          }]}
          series={[
            {
              data: prepData.map(item => item.asked)
            },
          ]}
          height={150}
          width={300}
        /> */}
        <Divider orientation='vertical' sx={{background:"#ed816680"}}/>
        <div style={{
          display: "flex",
          flexDirection: "column",
          flex: .5
        }}>
          {dataPrep.length > 0 && (
            <BarChart
              dataset={dataPrep}
              xAxis={[{
                scaleType: 'band',
                dataKey: 'title',
                categoryGapRatio: 0.9,
                barGapRatio: 0.9,
              }]}
              series={[
                {
                  dataKey: 'success',
                  label: 'Success',
                  stack: 'total',
                  color: '#4caf50',
                },
                {
                  dataKey: 'fail',
                  label: 'Blocked (PII)',
                  stack: 'total',
                  color: '#f44336',
                }
              ]}
              height={150}
              width={300}
              margin={{ left: 0, right: 50, top: 20, bottom: 30 }}

              yAxis={[{
                label: 'Question Asked',
              }]}

            />
          )}
        </div>


      </div>

    </div>
  )
}

export default Usage