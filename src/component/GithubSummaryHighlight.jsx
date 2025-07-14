import React from 'react'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { RenderMDX } from './RenderMdx';

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
    const data = useSelector((state) => state.mForm.workstreamOverview)
    //     const markdownContent = `
    // ### Hello, World!
    // This is a **Markdown** example rendered in React.

    // - Item 1
    // - Item 2
    // - Item 3

    // [Visit React](https://reactjs.org)
    // `;
    return (
        <div style={{
            display: "flex",
            gap: "5px",
            paddingTop: "13px",
            paddingLeft: "5px",
            paddingRight: "5px",
            flex: 0.6
        }}>
            {/* {data.map((item, idx) => {
                return <div key={idx} style={{
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 0 12px #cce4f0", 
                    textAlign: "start",
                    borderRadius: "5px",
                    flex:1

                }}  >
                    <span style={{ fontWeight: "bold", paddingLeft: "5px" }}>{item.heading}</span>

                    <ul>
                        {
                            item.value.map((mitem, midx) => {
                                return <li key={midx} style={{ fontSize: "12px",color:"black",fontWeight:"400",fontFamily:"sans-serif",textAlign:"start",padding:"2px" }}>{mitem}</li>
                            })
                        }
                    </ul>
                    <div style={{
                        fontSize:"16px",
                    }}>

                   

                    </div>
                </div>
            })} */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 12px #cce4f0",
                textAlign: "start",
                borderRadius: "5px",
                flex: 1,
                padding:"10px",
                marginBottom:"10px"
               
            }}  >
                <RenderMDX content={data.value} />
            </div>
        </div>
    )
}

export default GithubSummaryHighlight