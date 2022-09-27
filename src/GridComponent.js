import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import {  useState,useEffect, useRef } from 'react';
import {GridPDFExport} from '@progress/kendo-react-pdf';
import {ExcelExport} from '@progress/kendo-react-excel-export';
import { PDFExport } from '@progress/kendo-react-pdf';
import {ColumnMenu,ColumnMenuCheckboxFilter} from './ColumnMenu';



import axios from 'axios';

const baseURL="https://jsonplaceholder.typicode.com/todos";
const BooleanCell=(props) =>{
  return(
  <td>{props.dataItem[props.field] ? 'YES' : 'NO'} </td>
  )
}
const GridComponent=()=>{

  const _export = useRef(null);

  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [products,setProducts]=useState('initialDataState');
 

 const getProducts=()=>{
      axios.get(baseURL)
      .then(res=>{
        setProducts(res.data)
      }).catch(err=>{
    alert(err.message);
  })
};

useEffect(()=>getProducts(),[ ]);

  const [dataState,setDataState]=useState(initialDataState);
  const [result,setResult]=useState(process(products,dataState));

  
  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(products,event.dataState));
  }
 
  return (
    <ExcelExport data={products} ref={_export}>
    <Grid 
     data={result}
    pageable={true}
    filterable={true}
      sortable={true}
      groupable={true}
      total={products.length}
     
      onDataStateChange={onDataStateChange}
      {...dataState}
      
      
    >
      <GridToolbar>
          <button
            title="Export Excel"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={excelExport}
          >
            Export to Excel
          </button>
          
        </GridToolbar>
        
      
      <GridColumn field="id" title="Product ID"   editable={true} />
      <GridColumn field="userId" title="User ID" editable={true}/>
      <GridColumn field="title" title="Description" columnMenu={ColumnMenuCheckboxFilter} editable={true} />
      <GridColumn field="completed" title="Availability" cell={BooleanCell} filter='boolean'  />
      
      
    </Grid>
    </ExcelExport>
  );
}

export default GridComponent;
