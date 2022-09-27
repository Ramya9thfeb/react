import { useState } from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import Products1 from './Data/Products1.json';
import { ColumnMenu, ColumnMenuCheckboxFilter } from './ColumnMenu';
import index from './finance/dist/scss/index.scss';

const FilterCell=(props) =>{
    return(
    <td>{props.dataItem[props.filterCell] ? 'YES' : 'NO'} </td>
    )
  }
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  

const GridEditabledefault = () => {
    
    const [data, setData] = useState(Products1);
    const [editID, setEditID] = useState(null);
    const[result,setResult]=useState();
    const[datastate,setDataState]=useState();

    const rowClick = event => {
        setEditID(event.dataItem.product_id);
    };

    const itemChange = event => {
        const inEditID = event.dataItem.product_id;
        const field = event.field || '';
        const newData = data.map(item => item.product_id === inEditID ? {
            ...item,
            [field]: event.value
        } : item);
        setData(newData);
    };

    const closeEdit = event => {
        if (event.target === event.currentTarget) {
            setEditID(null);
        }
    };

    const addRecord = () => {
        const newRecord = {
            product_id: data.length + 1
        };
        setData([newRecord, ...data]);
        setEditID(newRecord.product_id);
    };
   
    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(Products1,event.dataState));
      }

    return <Grid
        data={data.map(item => ({
            ...item,
            inEdit: item.product_id === editID
        }))} editField="inEdit" onRowClick={rowClick} onItemChange={itemChange} 
        filterable={true}
        sortable={true}
        onDataStateChange={onDataStateChange}
        total={100}
        groupable={true}
        pageable={true}
    >

        <GridToolbar>
            <div onClick={closeEdit}>
                <button title="Add new" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={addRecord}>
                    Add new
                </button>
            </div>
        </GridToolbar>
        <Column field="product_id" title="Id" editable={false} ColumnMenu={ColumnMenu}/>
        <Column field="product_name" title="Name" />
        <Column field="product_description" title="Description" editor='text'  />
        <Column field="price" title="Price" editor="numeric" ColumnMenu={ColumnMenuCheckboxFilter} />
        <Column field="product_availability" title="Availability"  filter={FilterCell} ColumnMenu={ColumnMenuCheckboxFilter} />
    </Grid>;
};

export default GridEditabledefault;