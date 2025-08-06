import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Chip, Checkbox, ListItemText, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../App.css';

const SelectField = ({ datos_filtros, label, id, selectedData, setSelectedData, isDisabled }) => {

  /** Props **/ 
  
  // datos_filtros: Array de objetos con los datos a mostrar en el select
  // label: Etiqueta del select
  // id: Identificador del select
  // selectedData: Estado que guarda los valores seleccionados en el select
  // setSelectedData: Función para actualizar el estado de selectedData proveniente de componente padre
  // isDisabled: Booleano que indica si el select está deshabilitado
  
  /** Props **/ 

  // seletectValues es el estado que guarda los valores seleccionados en el SelectField
  const [selectedValues, setSelectedValues] = useState([]);
  
  useEffect(()=>{
    setSelectedValues([...selectedData]);
  },[selectedData]);
  
  // Toma el valor seleccionado y lo guarda en el estado de SelectField
  const handleChange = (event) => {
    setSelectedValues(event.target.value);
    setSelectedData(event.target.value);
  };

  // Toma el valor que ha sido deseleccionado y lo elimina del estado de SelectField
  const handleDelete = (value) => {  
    setSelectedValues((prevItems) => prevItems.filter(item => item !== value));
    setSelectedData((prevItems) => prevItems.filter(item => item !== value));
  };

  return (
    <>
      {/* Cuerpo del selectField */}
      <FormControl fullWidth variant="outlined" className="select_filter" sx={{ minWidth: 120 }}>
        <InputLabel disabled={isDisabled} className="size_filter" id="select-multiple-chip-label">{label}</InputLabel>
        {/* Construccion del select */}
        <Select labelId="select-multiple-chip-label"
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
                        onMouseDown={e => { e.stopPropagation() }}
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
          {/* Lista de opciones */}
          {datos_filtros.map(dato => (
             //<Tooltip key={dato.nombre_campo} title={dato.nombre_campo} placement='right'>
             <MenuItem  key={dato.nombre_campo}
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
                  <Checkbox sx={{ color: '#98C438', '&.Mui-checked': { color: '#98C438' } }} checked={selectedValues.indexOf(dato.nombre_campo) > -1} />
                  <ListItemText primary={dato.nombre_campo} />
              </MenuItem> 
              //</Tooltip>
          ))}
          {/* Lista de opciones */}
        </Select>
        {/* Construccion del select */}
      </FormControl>
      {/* Cuerpo del selectField */}
    </>
  );
  
};

export default SelectField;