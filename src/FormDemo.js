import React, { useState } from 'react';
import { MultiColumnComboBox, DropDownList } from "@progress/kendo-react-dropdowns";
import { DateInput, DatePicker } from "@progress/kendo-react-dateinputs";
import {
    Form,
    Field,
    FormElement,
    FieldWrapper,
} from "@progress/kendo-react-form";
import { Input, RadioButton, NumericTextBox } from "@progress/kendo-react-inputs";
import {
    Label,
    Error,
    Hint,
    FloatingLabel,
} from "@progress/kendo-react-labels";
import { items } from './Data/items';
import { Id } from './Data/Id';

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
        <div className="row example-wrapper">
            <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                <form className="k-form">
                    <fieldset>
                        <legend>SALES INVOICE</legend>

                        <div className="mb-3">
                            <span>Customer Id</span>

                            <div className="mb-3">
                                <DropDownList
                                    style={{
                                        width: "100%",
                                    }}

                                    onChange={handleChanged}
                                    name="cusid"
                                    data={Id}
                                    required={true}
                                />
                            </div>
                            <Input style={{
                                width: "100%",
                            }}
                                name="select an item"
                                type="numeric"
                            />

                        </div>
                        <div>

                            <div className="mb-3">
                                <span>Customer Name</span>
                                <Input
                                    name="customername"
                                    type="text"
                                    style={{
                                        width: "100%",
                                    }}

                                />
                            </div>

                            <div className="mb-3">
                                <span>Customer Type</span>
                                <br />
                                <RadioButton
                                    name="group1"
                                    value="New"
                                    checked={selectedValue === "New"}
                                    label="New"
                                    onChange={handleChange}

                                />
                                <br />

                                <RadioButton
                                    name="group1"
                                    value="Existing"
                                    checked={selectedValue === "Existing"}
                                    label="Existing"
                                    onChange={handleChange}
                                />
                                <br />
                            </div>
                            <label className="k-form-field">
                                <span>Invoice Date</span>
                                <DatePicker
                                    width="100%"
                                    name="Bill Date"
                                    required={true}
                                    format="dd-MMM-yyyy"
                                    min={today}
                                    defaultValue={today}
                                />
                            </label>
                        </div>


                        <div>
                            <span>Items</span>
                            <MultiColumnComboBox
                                name="items"
                                width="100%"
                                data={items}
                                required={true}
                                columns={columns}
                                textField={"name"}
                                
                            />
                        </div>

                        <div>
                            <NumericTextBox
                                value={qty}
                                name="Quantity"
                                width="100%"
                                label="Quantity"
                                required={true}
                                valid={qty > 0}
                                validationMessage={
                                    qty !== null ? '' : "Please enter proper Quantity!"
                                }
                            />
                        </div>

                    </fieldset>
                </form>
            </div>
        </div>
    );

}

export default FormDemo;