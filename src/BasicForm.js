import { React, useEffect, useState } from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input, RadioButton } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import countries from './Data/countries';
import { Button } from '@progress/kendo-react-buttons';
import { Checkbox } from "@progress/kendo-react-inputs";


const emailRegex = new RegExp(/\S+@\S+\.\S+/);


const emailValidator = value => emailRegex.test(value) ? "" : "Please enter a valid email.";

const EmailInput = fieldRenderProps => {
    const {
        validationMessage,
        visited,
        ...others
    } = fieldRenderProps;

    return <div>
        <Input {...others} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>;
};


const BasicForm = () => {

    const [gender, setGender] = useState('male');
    const [value, setValue] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleClick = () => {
        setValue(!value);
    };
    const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));
    const handleChangeradio = (event) => {
        setGender(event.target.value)
    }

   

    return (
        <Form onSubmit={handleSubmit} render={formRenderProps => <FormElement>

            <fieldset className={'k-form-fieldset'}>
                <legend className={'k-form-legend'}></legend>
                <div className="fname">
                    <Field
                        name={"firstName"}
                        component={Input}
                        label={"First name"}
                    />
                </div>

                <div className="lname">
                    <Field name={"lastName"}
                        component={Input}
                        label={"Last name"} />
                </div>

                <div className="email">
                    <Field
                        name={"email"}
                        type={"email"}
                        component={EmailInput}
                        label={"Email"}
                        validator={emailValidator}
                    />
                </div>

                <div className="Gender" >
                    <p> Gender</p>
                    <input
                        type="radio"
                        value="male"
                        checked={gender === 'male'}
                        onChange={handleChangeradio}
                    /> Male
                </div>
                <div>
                    <input
                        type="radio"
                        value="female"
                        checked={gender === 'female'}
                        onChange={handleChangeradio}
                    /> Female
                </div>
                <div>
                    <input
                        type="radio"
                        value="transgender"
                        checked={gender === 'transgender'}
                        onChange={handleChangeradio}
                    /> Transgender
                </div>


                <div className="Country">
                    <p>Country</p>
                    <DropDownList
                        data={countries}
                        defaultValue="List of Countries"
                    />
                </div>
                <div className="input-container">
                    <label>Phone Number</label>
                    <input type="numeric" name="PhoneNo." required />

                </div>

               <div>
                <Checkbox Checked={true} />
                    <label> I Agree to all terms & conditions</label>
                </div>
               
                <div className="k-form-buttons">
            <button
              type={"submit"}
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              disabled={!formRenderProps.allowSubmit}
            >
              Submit
            </button>
          </div>
            </fieldset>
        </FormElement>} />

    );
};

export default BasicForm;