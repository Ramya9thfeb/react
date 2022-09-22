import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { useEffect, useState } from 'react';
import {GridPDFExport} from '@progress/kendo-react-pdf';
import index from './finance/dist/scss/index.scss';

import axios from 'axios';


const baseURL="https://jsonplaceholder.typicode.com/todos";
const BooleanCell=(props) =>{
  return(
  <td>{props.dataItem[props.field] ? 'YES' : 'NO'} </td>
  )
}
const GridComponent=()=>{

  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [products,setProducts]=useState('');
  const[loading,setLoading]=useState(false);

 const getProducts=()=>{
      axios.get(baseURL)
      .then(res=>{
        setProducts(res.data)
      }).catch(err=>{
    alert(err.message);
  })
};

useEffect(()=>getProducts(),[ ]);

  const [dataState,setDataState]=useState(products,initialDataState);
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
      
      <GridColumn field="id" title="Product ID"   editable={true} />
      <GridColumn field="userId" title="User ID" editable={true}/>
      <GridColumn field="title" title="Description" editable={true} />
      <GridColumn field="completed" title="Availability" cell={BooleanCell} filter='boolean'  />
      
      
    </Grid>
  );
}

export default GridComponent;
