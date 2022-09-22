import React from 'react';
import GridComponent from './GridComponent';
import Header from './Header';
import Gridusingjson from './Gridusingjson';
import GridEditabledefault from './GridEditabledefault';
// import GridEditonTabClick from './GridEditonTabClick';


const App = () =>{
  return(
  <div>
    { /* A simple Header */ }
    <Header /> 
    {/* Grid with Sorting, filtering, paging using json file} */}
    <Gridusingjson /> 
    {/* Grid with Sorting, filtering, paging using axios to call API */}
      <GridComponent />
    {/* Grid with sorting, filtering, paging, editing by default */}
      <GridEditabledefault />
      {/* Grid with sorting, filtering, paging, editing on Click,including remove button */}
      {/* <GridEditonTabClick /> */}

  </div>
  );
} 

export default App;