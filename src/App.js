import React from 'react';
import GridComponent from './GridComponent';
import Header from './Header';
import GridEditabledefault from './GridEditabledefault';
import GridEditonTabClick from './GridEditonTabClick';
import FormComponent from './BasicForm';
import BasicForm from './BasicForm';
import FormDemo from './FormDemo';

const App = () => {
  return (
    <>
    <FormDemo />
 <GridComponent/>
 <GridEditabledefault/>
 <GridEditonTabClick/>
 </>
   

    // {/* <BasicForm /> */}
    // { /* A simple Header */ }
    // {/* <Header />  */}
    // {/* Grid with Sorting, filtering, paging using json file} */}
    // {/* <Gridusingjson />  */}
    // {/* Grid with Sorting, filtering, paging using axios to call API */}
    //   {/* <GridComponent /> */}
    // {/* Grid with sorting, filtering, paging, editing by default */}
    //   {/* <GridEditabledefault /> */}
    //   {/* Grid with sorting, filtering, paging, editing on Click,including remove button */}
    //   {/* <GridEditonTabClick /> */}


  );
}

export default App;