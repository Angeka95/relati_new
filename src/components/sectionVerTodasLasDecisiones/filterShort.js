import React from 'react';
import { useState } from 'react';
import Filter from './filter';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

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