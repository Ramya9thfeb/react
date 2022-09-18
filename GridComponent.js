import { Grid, GridColumn } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-material/dist/all.css';
//import products from './Data/Products.json';
import { process } from '@progress/kendo-data-query';
import { useEffect, useState } from 'react';
import axios from 'axios';


const baseURL="https://jsonplaceholder.typicode.com/users";
const BooleanCell=(props) =>{
  return(
  <td>{props.dataItem[props.field] ? 'YES' : 'NO'} </td>
  )
}
function GridComponent(){

  const [post,setPost]=useState(null);

  useEffect(()=>{
    axios.get(baseURL).then((response)=>{
      setPost(response.data)
    });
  },[]);
  const [dataState,setDataState]=useState({skip:0, take:10});
  const [result,setResult]=useState(process(post,dataState));

  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(post,event.dataState));
  }
  return (
    <Grid
      data={result}
      filterable={true}
      sortable={true}
      onDataStateChange={onDataStateChange}
      {...dataState}
      pageable={true}
      total={post.length}
      groupable={true}
      
    >
      <GridColumn field="id" title="Product ID"  />
      <GridColumn field="name" title="Product Name"    />
      <GridColumn field="email" title="Description"  />
      <GridColumn field="product_availability" title="Availability" filter='boolean'cell={BooleanCell}  />
      <GridColumn field="price" title="Price"  />
      
    </Grid>
  );
}

export default GridComponent;
