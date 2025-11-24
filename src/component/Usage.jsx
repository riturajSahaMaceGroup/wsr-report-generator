import React from 'react'
import TableContent from './TableContent'
import { BarChart, LineChart } from '@mui/x-charts'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import { RAG_STATUS } from './CostAnalysis'
import useGetRagStatus from '../hooks/useGetRagStatus'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Usage = ({type}) => {

  const usage = type == "construct"?useSelector((state) => state.mForm.usage.construct):useSelector((state) => state.mForm.usage.consult)
  console.log(`usage: ${JSON.stringify(usage)} type: ${JSON.stringify(type)}`)
 
  const dataPrep = React.useMemo(() => {
    let mprep = [];
    Object.keys(usage).forEach((val) => {
      const asked = Number(usage[val]["Questions Asked"]);
      const blocked = Number(usage[val]["Blocked (PII)"]);
      // console.log("Bloked PII: ",blocked)
      const tempObj = {
        title: val == 'week_0' ? "curr.week" : val == "week_1" ? "curr.week-1" : "curr.week-2",
        asked,
        blocked,
        success: asked - blocked,
        fail: blocked
      };
      mprep.push(tempObj);
    });
    // console.log("dataPrep: ", mprep); 
    return mprep
  }, [usage])


  const ResponseTimeTable =  React.memo((props) => { {
    const { responseData } = props
    console.log("responsedat: ",responseData)
    const mResponseData = Object.entries(responseData).map(([week, data]) => {
      const weekNumber = parseInt(week.split("_")[1], 10);
      const formattedWeek = weekNumber === 0 ? "curr.week" : `curr.week-${weekNumber}`;
    
      return {
        week: formattedWeek,
        avgResponseTime: data["Avg. Response Time"],
        maxResponseTime: data["Max Response Time"],
        questionAsked: data["Questions Asked"],
        blockedPII: data["Blocked (PII)"],
        resBeyond: data["Res. Beyond 3min"]
      };
    });
    
    const cellStyle = {
      fontSize: '0.7rem', // Smaller font
      padding: '2px 5px' // Minimal padding
    };

    return (
      <TableContainer component={Paper}
        sx={{
          width:"100%" , // Set a smaller width
          // marginLeft: 2,
          // mt: 2,
          boxShadow: 3,
          borderRadius: 2,
          // marginTop:2,
          marginBottom:2,
         
        }}
      >
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}><strong>Week</strong></TableCell>
              <TableCell sx={cellStyle}><strong>Avg. Time</strong></TableCell>
              <TableCell sx={cellStyle}><strong>Max Response Time</strong></TableCell>
              <TableCell sx={cellStyle}><strong>Question Asked</strong></TableCell>
              <TableCell sx={cellStyle}><strong>Blocked (PII)</strong></TableCell>
              <TableCell sx={cellStyle}><strong>Res. beyond 3 min</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mResponseData.map((row) => (
              <TableRow key={row.week}>
                <TableCell sx={cellStyle}>{row.week}</TableCell>
                <TableCell sx={cellStyle}>{row.avgResponseTime}</TableCell>
                <TableCell sx={cellStyle}>{row.maxResponseTime}</TableCell>
                <TableCell sx={cellStyle}>{row.questionAsked}</TableCell>
                <TableCell sx={cellStyle}>{row.blockedPII}</TableCell>
                <TableCell sx={cellStyle}>{row.resBeyond}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
});
  const responseTimes = React.useMemo(() => [
    // parseFloat(usage.week_2["Avg. Response Time"].replace(" min", "")),
    parseFloat(usage.week_2["Avg. Response Time"].split(" ")[0]),
    // parseFloat(usage.week_1["Avg. Response Time"].replace(" min", "")),
    parseFloat(usage.week_1["Avg. Response Time"].split(" ")[0]),
    // parseFloat(usage.week_0["Avg. Response Time"].replace(" min", ""))
    parseFloat(usage.week_0["Avg. Response Time"].split(" ")[0])
  ], [usage]);

  return (
    <div style={{display:"flex"}}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        width:"100%",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          flex: .5,
        }}>

          <div style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            fontSize: "14px",
            justifyContent: "center",
            paddingLeft:"8px",
           
          }}>

            <ResponseTimeTable responseData={usage} />

          </div>
        </div>

        <Divider sx={{ width: "100%", background: "#ed816680" }} />
        <div style={{
          display: "flex",
          flex: .5,
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
              xAxis={[{ scaleType: 'point', data: ['curr.week-2', 'curr.week-1', 'curr.Week'] }]}
              yAxis={[{ min: 0, max: 4, valueFormatter: (v) => `${v} min` }]}
              series={[
                {
                  label: 'Avg. Response Time (min)',
                  data: responseTimes
                },
              ]}
              // height={200}
              height={120}
              margin={{ left: 0, right: 50, top: 20, bottom: 30 }}
            />
          </div>

          <Divider orientation='vertical' sx={{ background: "#ed816680" }} />
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
                    color: '#939494',
                  },
                  {
                    dataKey: 'fail',
                    label: 'Blocked (PII)',
                    stack: 'total',
                    color: '#e9a7de',
                  }
                ]}
                height={120}
               
                margin={{ left: 0, right: 50, top: 20, bottom: 30 }}

                yAxis={[{
                  label: 'Question Asked',
                }]}

              />
            )}
          </div>


        </div>
      </div>
      <RAG_STATUS status={useGetRagStatus(`${type=='construct'?'usage_construct':'usage_consult'}`)} />

    </div>
  )
}

export default Usage