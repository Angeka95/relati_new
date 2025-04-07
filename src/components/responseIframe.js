import React from "react";
import { Box } from "@mui/material";

const ResponsiveIframe = ({ src, title }) => {
  /*return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%", // Relación 16:9 -> (9/16)*100
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        component="iframe"
        src={src}
        allowFullScreen
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </Box>
  );*/
  return(<>
            <div class="iframe-container">
              <iframe src={src} frameborder="0" allowfullscreen title={title}></iframe>
            </div>
        </>);
};

export default ResponsiveIframe;
