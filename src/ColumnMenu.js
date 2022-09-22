import * as React from 'react';
import { GridColumnMenuFilter, GridColumnMenuCheckboxFilter } from '@progress/kendo-react-grid';
import Products from './Data/Products.json';

export const ColumnMenu = props => {
  return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
      </div>;
};
export const ColumnMenuCheckboxFilter = props => {
  return <div>
        <GridColumnMenuCheckboxFilter {...props} data={Products} expanded={true} />
      </div>;
};

export default ColumnMenu;