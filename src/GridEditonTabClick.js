import * as React from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { MyCommandCell } from "./myCommandCell";
import { sampleProducts } from "./sampleProducts";
import { useState,useEffect } from "react";
import '@progress/kendo-theme-material/dist/all.css';
const editField = "inEdit";

let data = [...sampleProducts];

const generateId = data => data.reduce((acc, current) => Math.max(acc, current.ProductID), 0) + 1;

export const insertItem = item => {
  item.ProductID = generateId(data);
  item.inEdit = false;
  data.unshift(item);
  return data;
};
export const getItems = () => {
  return data;
};
export const updateItem = item => {
  let index = data.findIndex(record => record.ProductID === item.ProductID);
  data[index] = item;
  return data;
};
export const deleteItem = item => {
  let index = data.findIndex(record => record.ProductID === item.ProductID);
  data.splice(index, 1);
  return data;
};
const GridEditonTabClick = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let newItems = getItems();
    setData(newItems);
  }, []); 

  const remove = dataItem => {
    const newData = deleteItem(dataItem);
    setData(newData);
  };

  const add = dataItem => {
    dataItem.inEdit = true;
    const newData = insertItem(dataItem);
    setData(newData);
  };

  const update = dataItem => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
  }; 


  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = dataItem => {
    const originalItem = getItems().find(p => p.ProductID === dataItem.ProductID);
    const newData = data.map(item => item.ProductID === originalItem.ProductID ? originalItem : item);
    setData(newData);
  };

  const enterEdit = dataItem => {
    setData(data.map(item => item.ProductID === dataItem.ProductID ? { ...item,
      inEdit: true
    } : item));
  };

  const itemChange = event => {
    const newData = data.map(item => item.ProductID === event.dataItem.ProductID ? { ...item,
      [event.field || '']: event.value
    } : item);
    setData(newData);
  };

  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      Discontinued: false
    };
    setData([newDataItem, ...data]);
  };

  const CommandCell = props => <MyCommandCell {...props} edit={enterEdit} remove={remove} add={add} discard={discard} update={update} cancel={cancel} editField={editField} />;

  return (<Grid data={data} onItemChange={itemChange} editField={editField}
    pageable={true}
    total={sampleProducts.length}
    filterable={true}
    sortable={true}
    groupable={true}
    >
    
          <GridToolbar>
            <button title="Add new" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={addNew}>
              Add new
            </button>
          </GridToolbar>
          
          <Column field="ProductID" title="Id"  editable={true} />
          <Column field="ProductName" title="Product Name"  />
          <Column field="FirstOrderedOn" title="First Ordered" editor="date" format="{0:d}" />
          <Column field="UnitsInStock" title="Units" width="120px" editor="numeric" filter="numeric" />
          <Column field="Discontinued" title="Discontinued" editor="boolean" filter="boolean" />
          <Column cell={CommandCell} filterable={false} />
        </Grid>);
};

export default GridEditonTabClick;