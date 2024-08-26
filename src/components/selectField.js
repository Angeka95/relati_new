import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../App.css'; 
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Checkbox, ListItemText} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




export default function Select_field({datos_filtros, label, id, setSelectedData, isDisabled}) {
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
      if(isDisabled) {
        setSelectedValues([])
      }
    }, [isDisabled]);

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
      <InputLabel disabled={isDisabled} id="select-multiple-chip-label">{label}</InputLabel>
      <Select
        labelId="select-multiple-chip-label"
        id={"d_"+id}
        multiple
        value={selectedValues}
        onChange={handleChange}
        disabled={isDisabled}
        label="Opciones"

          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip   
                onMouseDown={e => {
                    e.stopPropagation()
                  }}
                onDelete={() => handleDelete(value)} 
                className="chip_select" key={value} label={value} 
                deleteIcon={
                    
                <CloseIcon className="icon_cancel"/>
                  }
                />
                
                
              ))}
            </Box>
          )}

          MenuProps={{
            PaperProps: {
              sx: {
                boxShadow: '0px 8px 24px rgba(57, 129, 195, 0.2) ', // Sombra 
              },
            },
          }}
      >


        {datos_filtros.map(dato => (
            <MenuItem key={dato.nombre_campo} value={dato.nombre_campo}
            sx={{
                backgroundColor: 'white', // Color de fondo por defecto
                '&.Mui-selected': {
                  backgroundColor: '#F2F8FB', // Verde claro para el ítem seleccionado
                },
                '&:hover': {
                  backgroundColor: '#F2F8FB', // Verde más oscuro para hover
                },
                // Asegura que el color de fondo seleccionado no se sobreescriba en hover
                '&.Mui-selected:hover': {
                  backgroundColor: '#F2F8FB', // El mismo verde más oscuro en hover
                }
              }}>
              <Checkbox  sx={{
                color: '#98C438', // Verde para el checkbox no marcado
                '&.Mui-checked': {
                  color: '#98C438', // Verde más oscuro para el checkbox marcado
                },
              }} checked={selectedValues.indexOf(dato.nombre_campo) > -1} />
              <ListItemText primary={dato.nombre_campo} />
            </MenuItem>
          ))}

      </Select>
      
      {/* <div>
        Seleccionado: {selectedValue || 'Ninguno'}
      </div> */}
      
    </FormControl>


    );
  }