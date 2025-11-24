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

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000); // updates every second

  //   return () => clearInterval(timer); // cleanup on unmount
  // }, []);

  return (
    <Provider store={store}>

      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "99vw",
        // border:"1px solid black",
        flex: 1
      }}>
        
        <div style={{ display: "flex"}}>
           <div style={{display: "flex",flexDirection:"column",width:"50%",border:"1px solid black"}}>
           <Divider sx={{
                    fontSize: "12px", fontWeight: "bold",
                    '&::before, &::after': {
                      borderTopWidth: '1px',
                      borderColor: "black"
                    }
                  }}>Cost Management</Divider>
                  <CostAnalysis />
           </div>
          <DateRender />
        </div>
        <div style={{
          display: "flex",
          width: "100%",       
          flexDirection: "horizontal",
          
        }}>
          {
            [1, 2].map((val, idx) => {
              return <div key={idx} style={{  flex: 0.5 }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "10px",
                  flex: .5,
                  borderLeft: "1px solid black",
                  borderBottom:"1px solid black",
                  borderRight:val!=1?"1px solid black":"",
                  // borderTop:val!=1?"1px solid black":""
                }}>
                  <span style={{
                    boxShadow: "0 0 12px rgb(218, 153, 191)",
                    color: "white",
                    padding: "5px",
                    margin: "1px",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    fontSize: "12px",
                    background: val == 1 ? "linear-gradient(90deg,rgba(255, 210, 8, 1) 0%, rgba(255, 176, 5, 1) 45%, rgba(236, 115, 33, 1) 100%)" : "linear-gradient(90deg,rgba(21, 245, 234, 1) 0%, rgba(35, 175, 117, 1) 45%, rgba(14, 139, 98, 1) 100%)"
                  }}>{val == 1 ? "Construct" : "Consult"}</span>
                 
                  <Divider sx={{
                    fontSize: "12px", fontWeight: "bold",
                    '&::before, &::after': {
                      borderTopWidth: '2px',
                      borderColor: "black"
                    }
                  }}>Usage</Divider>

                  <Usage type ={val==1?"construct":"consult"}/>


                  <Divider sx={{
              fontSize: "12px", fontWeight: "bold",
              '&::before, &::after': {
                borderTopWidth: '2px',
                borderColor: "black"
              }
            }}>Data Ingestion</Divider>
            <Injetion type ={val==1?"construct":"consult"}/>
                </div>
              </div>

            })
          }
        </div>
         <div style={{display: "flex",
            flexDirection:"column",
            width:"100%",
           
            }}>
             <span style={{
              fontSize:"14px",
              fontWeight:"bold"
            }}>Workstream overview</span>
            <GithubSummaryHighlight />
           </div>
        {/* <div style={{ display: "flex", height: "30%", border: "1px solid blue", }}></div> */}
        <BottomSheetModal />
      </div>
    </Provider>
  )
}
export const DateRender = () => {
  const mDate = useSelector((state) => state.mForm.submissionDate)
  return <span style={{ display:"flex",
        flex:1,
        fontWeight: "bold", 
        fontSize: "18px", 
        margin:"5px",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 0 14px rgb(247, 197, 105)",
        color: "black",
         }}>{`pAIge Weekly Status Report: `}<span style={{ fontWeight: "bold", fontSize: "15px", marginTop: "10px", marginBottom: "10px" }}>{`${mDate}`}</span></span>
}
export default App


