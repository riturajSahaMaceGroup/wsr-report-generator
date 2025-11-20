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
                flexDirection: "column",
                boxShadow: "0 0 18px #fcc8a6ff",
                textAlign: "start",
                borderRadius: "5px",
                flex: 1,
                paddingLeft:"10px",
                paddingright:"10px",
                margin:"10px"
                
            }}  >
                <RenderMDX content={data.value} />
            </div>
       
    )
}

export default GithubSummaryHighlight