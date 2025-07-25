import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CostAnalysis from './component/CostAnalysis'
import Usage from './component/Usage'
import Injetion from './component/Injetion'
import GithubSummary from './component/GithubSummary'
import GithubSummaryHighlight from './component/GithubSummaryHighlight'
import Divider from '@mui/material/Divider'
import { Provider, useSelector } from 'react-redux'
import { store } from './applicationStore/store'
import BottomSheetModal from './component/BottomSheetModal'

import '@mdxeditor/editor/style.css';

function App() {
  const [count, setCount] = useState(0)

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // updates every second

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <Provider store={store}>

      <div style={{
        display: "flex",
        flexDirection: "column",
        // height: "99.5vh",
        width: "95vw",
        // border:"1px solid black",
        flex: 1
      }}>
        <DateRender />
        <div style={{
          display: "flex",
          height: "99%",
          width: "100%",
          border: "1px solid black",
          // flex: 1
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
            flex: .57
          }}>
            <span style={{
              boxShadow: "0 0 12px rgb(218, 153, 191)",
              color: "white",
              padding: "5px",
              margin: "1px",
              fontWeight: "bold",
              borderRadius: "10px",
              fontSize: "12px",
              background: "linear-gradient(90deg,rgba(222, 82, 117, 1) 0%, rgba(199, 87, 149, 1) 45%, rgba(104, 83, 237, 1) 100%)"
            }}>Application Performance</span>
            <Divider sx={{
              fontSize: "12px", fontWeight: "bold",
              '&::before, &::after': {
                borderTopWidth: '2px',
                borderColor: "black"
              }
            }}>Cost Management</Divider>
            <CostAnalysis />
            <Divider sx={{
              fontSize: "12px", fontWeight: "bold",
              '&::before, &::after': {
                borderTopWidth: '2px',
                borderColor: "black"
              }
            }}>Usage</Divider>

            <Usage />


            <Divider sx={{
              fontSize: "12px", fontWeight: "bold",
              '&::before, &::after': {
                borderTopWidth: '2px',
                borderColor: "black"
              }
            }}>Data Ingestion</Divider>
            <Injetion />
          </div>
          <Divider orientation='vertical' sx={{
            borderWidth: "2px",
            marginLeft: "10px",
            background: "rgba(136, 142, 224, 0.29)",
            boxShadow: "0 0 12px rgb(218, 153, 191)",
            // height:"97.5vh"
          }}></Divider>
          <div style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
            flex: .43
          }}>
            <span style={{
              boxShadow: "0 0 12px rgb(218, 153, 191)",
              color: "white",
              padding: "5px",
              margin: "1px",
              fontWeight: "bold",
              borderRadius: "10px",
              fontSize: "12px",
              background: "linear-gradient(90deg,rgba(222, 82, 117, 1) 0%, rgba(199, 87, 149, 1) 45%, rgba(104, 83, 237, 1) 100%)"
            }}  >Application Development</span>
            <GithubSummary />
            

            {/* <Divider sx={{ fontSize: "12px", fontWeight: "bold", width: "1px", background: "rgba(136, 142, 224, 0.29)", }} orientation='horizontal'></Divider> */}
            <span style={{
              fontSize:"16px",
              fontWeight:"bold"
            }}>Workstream overview</span>
            <GithubSummaryHighlight />
            
          </div>
        </div>
        <BottomSheetModal />
      </div>
    </Provider>
  )
}
const DateRender = () => {
  const mDate = useSelector((state) => state.mForm.submissionDate)
  return <span style={{ fontWeight: "bold", fontSize: "25px", marginTop: "2px", marginBottom: "2px" }}>{`pAIge Weekly Status Report: `}<span style={{ fontWeight: "bold", fontSize: "15px", marginTop: "10px", marginBottom: "10px" }}>{`${mDate}`}</span></span>
}
export default App
