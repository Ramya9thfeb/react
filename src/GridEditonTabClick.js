import {useState} from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { sampleProducts } from './Data/sampleProducts';
import { MyCommandCell } from './MyCommandCell';
import { insertItem, getItems, updateItem, deleteItem } from "./services";

const GridEditonTabClick = () => {
  const editField = "inEdit";
  const [data, setData] = useState(sampleProducts);

  const CommandCell = props => <MyCommandCell {...props} edit={enterEdit} remove={remove} add={add} discard={discard} update={update} cancel={cancel} editField={editField} />; // modify the data in the store, db etc


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


  const discard = dataItem => {
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
    let newData = data.map(item => item.ProductID === dataItem.ProductID ? { ...item,
      inEdit: true
    } : item);
    setData(newData);
  };

  const itemChange = event => {
    const field = event.field || '';
    const newData = data.map(item => item.ProductID === event.dataItem.ProductID ? { ...item,
      [field]: event.value
    } : item);
    setData(newData);
  };

  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      Discontinued: false,
      ProductID: new Date().getMilliseconds()
    };
    setData([newDataItem, ...data]);
  };

  return <Grid data={data} 
  pageable={true}
  filterable={true}
  sortable={true}
  onItemChange={itemChange} editField={editField} dataItemKey={'ProductID'}>
        <GridToolbar>
         
          <button title="Add new" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={addNew}>
            Add new
          </button>
        </GridToolbar>
        <Column field="ProductID" title="Id"  editable={false} />
        <Column field="ProductName" title="Product Name" />
        <Column field="FirstOrderedOn" title="First Ordered" editor="date" format="{0:d}" />
        <Column field="UnitsInStock" title="Units" editor="numeric" />
        <Column field="Discontinued" title="Discontinued"  />
        <Column cell={CommandCell}  />
      </Grid>;
};

export default GridEditonTabClick;