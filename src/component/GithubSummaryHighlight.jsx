import React from 'react'
import { useSelector } from 'react-redux'

const GithubSummaryHighlight = () => {
    // const [data, setData] = React.useState([
    //     {
    //         heading: "Backlog",
    //         value: ["Customizable Response Length", "Disaster Recovery Strategy for MACE"]
    //     },
    //     {
    //         heading: "Development",
    //         value: ["Secret Expire Handling", "Model Version Pinning & Upgrade Policy", "Word Add-in User Authentication", "Semantic Re-Ranking in AI Search"]
    //     },
    //     {
    //         heading: "Ready To Deploy ",
    //         value: ["KPI Dashboard Monitoring", "Pinned Python Library Versions", "Sanitization of Output Keywords"]
    //     }
    // ])
    const data = useSelector((state)=> state.mForm.gitHighlight)
    return (
        <div style={{
            display: "flex",
            gap: "5px",
            paddingTop: "13px",
            paddingLeft: "5px",
            paddingRight: "5px"
        }}>
            {data.map((item, idx) => {
                return <div key={idx} style={{
                    display: "flex",
                    flexDirection: "column",
                    // border: ".5px solid black",
                    boxShadow: "0 0 12px #cce4f0", // Drop shadow
                    // filter: "blur(2px)",// Blur effect
                    textAlign: "start",
                    borderRadius: "5px",

                }}  >
                    <span style={{ fontWeight: "bold", paddingLeft: "5px" }}>{item.heading}</span>

                    <ul>
                        {
                            item.value.map((mitem, midx) => {
                                return <li key={midx} style={{ fontSize: "12px",color:"black",fontWeight:"400",fontFamily:"sans-serif",textAlign:"start",padding:"2px" }}>{mitem}</li>
                            })
                        }
                    </ul>
                </div>
            })}
        </div>
    )
}

export default GithubSummaryHighlight