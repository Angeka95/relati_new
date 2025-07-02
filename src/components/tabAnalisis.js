

import { AppBar, Tabs, Tab, Box, Container, Button, } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';


export default function TabAnalisis({ data }) {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tab1" />
        <Tab label="Tab2" />
      </Tabs>

      {value === 0 && (
        <div className="wrap margin_top_m display_flex justify_center">
          {data.map((item) => (


            <div key={item.id} >
                <div className="display_flex justify_center transition_smooth">
              
                    <a href={item.url} target="_blank" rel="noreferrer" className="justify_center ">
                    <img className="cover_container_analisis" src={item.cover}/> 
                    </a>


                </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
}