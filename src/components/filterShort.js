import { Card, CardContent, Button, CardMedia } from '@mui/material';
import { Container, Grid, Box, Chip } from '@mui/material';
import { BuildTwoTone } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Filter from './filter';
import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';



export default function FilterShort({ setSelectedFilters, isFilterWindowLeft }) {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="position_relative query_none">
        <Button className={showFilter ? ("button_function_noradius button_filter_size_s") : ("button_function button_filter_size_s")}
        startIcon={<FilterListIcon />}
        onClick={handleFilter}>
        Filtrar
        </Button>

        <div className={ isFilterWindowLeft ? "position_float filter_window_size is_filter_window_left" : "position_float filter_window_size"}>
        <Filter isShowingFilter={showFilter} isFilterFloat={true} setSelectedFilters={setSelectedFilters} />
        </div>
    </div>
  );
}