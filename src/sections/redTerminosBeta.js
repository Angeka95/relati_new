import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Button } from '@mui/material';
import ForceGraph2D from 'react-force-graph-2d';
import ResponsiveIframe from '../components/responseIframe';
import tesauroService from '../services/tesauro';
import '../App.css';

export default function RedTerminos() {
    const fgRef = useRef();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [message, setMessage] = useState({ message: "", classname: "" });

    const loadingGraph = () => {
     
        let newMessage = { message: "", classname: "" };
        tesauroService
            .getDataGraph()
            .then(response => {
                
                if((response.status_info.status === 200) && (response.data.length > 0)) {
                    const data = response.data[0];
                    setGraphData(data);
                    newMessage = { message: `${response.status_info.reason}`, classname: "success" };
                } else {
                    newMessage = { message: `${response.status_info.reason}`, classname: "error" };
                }
                setMessage(newMessage);
            })
            .catch(error => {
                newMessage = { message: `${error}`, classname: "error" };
                setMessage(newMessage); 
            });
    }
    
    useEffect(() => {
        if(graphData.hasOwnProperty("nodes") && (graphData["nodes"].length === 0)) {
            loadingGraph();
        }
    }, []);

    return (
        <>
        <Container className="margin_bottom_m">
             <h1 className="width_100 text_center margin_top_l">Red de Términos</h1>
             <h5 className="width_100 text_center margin_bottom_m">Interactúe con las palabras clave del Tesauro a través de sus redes y relaciones temáticas.</h5>
            {(graphData.hasOwnProperty("nodes") && (graphData["nodes"].length > 0)) && (
             <Box sx={{ marginTop: "1rem", marginBottom: "1rem", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", width: "100%", height: "600px" }}>
                <ForceGraph2D
                    graphData={graphData}
                    nodeAutoColorBy="group"
                    globalScale={0.5}
                    height={600}
                    ref={fgRef}
                    style={{ width: '100%', height: '100%' }}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.id;
                        const fontSize = 12/globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;
                        const textWidth = ctx.measureText(label).width;
                        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = node.color;
                        ctx.fillText(label, node.x, node.y);

                        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                    }}
                    nodePointerAreaPaint={(node, color, ctx) => {
                        ctx.fillStyle = color;
                        const bckgDimensions = node.__bckgDimensions;
                        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                    }}
                    onEngineStop={() => fgRef.current.zoomToFit(400)}
                />
            </Box>
             )}
        </Container>  
        </>
    );
}
