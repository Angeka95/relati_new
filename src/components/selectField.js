import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../App.css';
import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/context';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Checkbox, ListItemText, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Select_field({ datos_filtros, label, id, selectedData, setSelectedData, isDisabled }) {

  const [selectedValues, setSelectedValues] = useState([]);
  
  useEffect(()=>{
    setSelectedValues([...selectedData]);
  },[selectedData]);
  
  const handleChange = (event) => {
    setSelectedValues(event.target.value);
    setSelectedData(event.target.value);
  };

  const handleDelete = (value) => {
    setSelectedValues((prevItems) => prevItems.filter(item => item !== value));
    setSelectedData((prevItems) => prevItems.filter(item => item !== value));
  };

  return (

    <FormControl fullWidth variant="outlined" className="select_filter" sx={{ minWidth: 120 }}>
      <InputLabel disabled={isDisabled} className="size_filter" id="select-multiple-chip-label">{label}</InputLabel>
      <Select
      
        labelId="select-multiple-chip-label"
        id={"d_" + id}
        multiple
        value={selectedValues}
        onChange={handleChange}
        disabled={isDisabled}
        label="Opciones"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 400,
              maxWidth: 200,
              overflowY: 'auto',
              boxShadow: '0px 8px 24px rgba(57, 129, 195, 0.2)'
            },
          },
        }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 , maxWidth: 200}}>
            {selected.map((value) => (
              <Chip
                onMouseDown={e => {
                  e.stopPropagation()
                }}
                title={value} 
                onDelete={() => handleDelete(value)}
                className="chip_select" key={value} label={value}
                deleteIcon={

                  <CloseIcon className="icon_cancel" />
                }
              />


            ))}
          </Box>
        )}
      >


        {datos_filtros.map(dato => (
          // <Tooltip key={dato.nombre_campo} title={dato.nombre_campo} placement='right'>
           <MenuItem
            key={dato.nombre_campo}
            value={dato.nombre_campo}
            sx={{
              backgroundColor: 'white',
              '&.Mui-selected': {
                backgroundColor: '#F2F8FB',
              },
              '&:hover': {
                backgroundColor: '#F2F8FB',
              },
              '&.Mui-selected:hover': {
                backgroundColor: '#F2F8FB',
              },
             
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 280, 
            }}
            title={dato.nombre_campo} 
          >
            <Checkbox
              sx={{
                color: '#98C438',
                '&.Mui-checked': {
                  color: '#98C438',
                  
                },
              }}
              checked={selectedValues.indexOf(dato.nombre_campo) > -1}
            />
            <ListItemText primary={dato.nombre_campo} />
          </MenuItem> 
          // </Tooltip>
        ))}

      </Select>

      {/* <div>
        Seleccionado: {selectedValue || 'Ninguno'}
      </div> */}

    </FormControl>


  );
}