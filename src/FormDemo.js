import React, { useState } from 'react';
import { MultiColumnComboBox, DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { DateInput, DatePicker } from "@progress/kendo-react-dateinputs";
import {Address} from './Data/Address';
import {
    Form,
    Field,
    FormElement,
    FieldWrapper,
} from "@progress/kendo-react-form";
import { Input, RadioButton, NumericTextBox, Checkbox } from "@progress/kendo-react-inputs";
import {
    Label,
    Error,
    Hint,
    FloatingLabel,
} from "@progress/kendo-react-labels";
import { items } from './Data/items';
import { Id } from './Data/Id';
import { Name } from './Data/Name';
import { currency } from './Data/currency';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "@progress/kendo-react-buttons";




const FormDemo = () => {

    const columns = [
        {
            field: "id",
            header: "ID",
            width: "90px",
        },
        {
            field: "name",
            header: "Item Name",
            width: "150px",
        },
        {
            field: "position",
            header: "Position",
            width: "480px",
        },
    ];

    const today = new Date();
    const [selectedValue, setSelectedValue] = React.useState("New");
    const [qty, setQty] = React.useState(0);
    const [item, setItem] = useState(0);
    const [state, setState] = useState({ constId: null });
    const handleChange = React.useCallback(
        (e) => {
            setSelectedValue(e.value);
        },
        [setSelectedValue]
    );
    const handleChanged = (event) => {
        let name = event.target.name || event.target.element.current.name;
        setState({ ...state, [name]: event.target.value });
    };
    return (
        <div className="body-content">
            <div class='contentBox' >
            <Container>
                <div class="appContent">
            <form className="k-form">
            <div class="header">
                        <h2>SALES INVOICE</h2>  </div>  
     
      <Row>
        <Col><span>Customer Id</span>

<div className="mb-3">
    <Input
        style={{
            width: "100%",
        }}

        onChange={handleChanged}
        name="cusid"
        data={Id}
        defaultValue={''}
    />
</div>
</Col>
        <Col><span>Customer Name</span>
        <div className="mb-3">
                                <Input
                                    name="customername"
                                    type="text"
                                    

                                /></div>
                                </Col>
                                </Row>
                                <Row>
        <Col><span>Customer Type</span>
                                <br />
                                <div className="mb-3" style={{display:"flex"}}>
                                <RadioButton
                                    name="group1"
                                    value="New"
                                    checked={selectedValue === "New"}
                                    label="New"
                                    onChange={handleChange}

                                />
                                <RadioButton
                                    name="group1"
                                    value="Existing"
                                    checked={selectedValue === "Existing"}
                                    label="Existing"
                                    onChange={handleChange}
                                />
                                </div>
                                </Col>
                                <Col>
        
        <span>Address</span>
        <div className="mb-3"> 
                                <DropDownList
                                
                                data={Address}
                                defaultItem="Select Customer Address ..."
                                filterable={true}
                                
                               /></div>
                               
                               </Col></Row>
      
        
                     <Row>
        <Col><span>Items</span>
        <div className="mb-3">
                            <MultiColumnComboBox
                                name="items"
                                width="100%"
                                data={items}
                                
                                columns={columns}
                                textField={"name"}
                                
                            />
                            </div></Col>
        <Col>
        <div className="mb-3">
        <NumericTextBox
                                value={qty}
                                name="Quantity"
                                width="100%"
                                label="Quantity"
                                
                                // valid={qty > 0}
                                // validationMessage={
                                //     qty !== null ? '' : "Please enter proper Quantity!"
                                
                            /></div>
                            
                            </Col>
      </Row>
      
      <Row>
        <Col><span>Currency </span><br/>
        <div className="mb-3">
        <DropDownList
                                
                                data={currency}
                                defaultItem="Select Custome Currency..."
                                filterable={true}
                                
                               /></div>
        </Col>
       
        <Col><span>Invoice Amount</span>
        <div className="mb-3"> <NumericTextBox
                                
                                name="Total Invoice Amount"
                                onChange={handleChanged}
                            /></div>
                            </Col>
      </Row>
      <Row>
        <Col><span>Net Amount</span>
        <div className="mb-3"> <NumericTextBox
                                name="Net Amount"
                                onChange={handleChanged}
                               
                            />
                            </div></Col>
       
        <Col> <span>Tax Amount</span>
        <div className="mb-3">  <NumericTextBox      
                                name="Tax Amount"
                               
                            /></div>
                            </Col>
      </Row>
      <Row>
        <Col>
        
        <span>Entity</span>
        <div className="mb-3">
    <MultiSelect
        
        type="text"

        onChange={handleChanged}
        name="customer"
        data={Name}
        defaultItem="Select Customer Entity ..."
        
        
    /></div>
    </Col>
    <Col></Col>
       
        
      </Row>

      
      </form>
      <div style={{padding:"10px"}}><Button themeColor={"primary"}>Submit</Button>
   <div className="space"></div> <Button themeColor={"primary"}>Reset</Button></div>
      </div>
    </Container>
    
    </div>
           
        </div>


    );

}

export default FormDemo;