import { Grid, GridColumn } from '@progress/kendo-react-grid';
import products from './Data/Products.json';
import { process } from '@progress/kendo-data-query';
import { useEffect, useState } from 'react';
import index from './finance/dist/scss/index.scss';


const BooleanCell=(props) =>{
  return(
  <td>{props.dataItem[props.field] ? 'YES' : 'NO'} </td>
  )
}
function GridComponent(){

 
  const [dataState,setDataState]=useState({skip:0, take:10});
  const [result,setResult]=useState(process(products,dataState));

  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(products,event.dataState));
  }
  return (
    <Grid
      data={result}
      filterable={true}
      sortable={true}
      onDataStateChange={onDataStateChange}
      {...dataState}
      pageable={true}
      total={products.length}
      groupable={true}
  
      
    >
      <GridColumn field="product_id" title="Product ID"  />
      <GridColumn field="product_name" title="Product Name"   />
      <GridColumn field="product_description" title="Description"  />
      <GridColumn field="product_availability" title="Availability" filter='boolean'cell={BooleanCell}  />
      <GridColumn field="price" title="Price"  />
      
    </Grid>
  );
}

export default GridComponent;
