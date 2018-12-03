import React, {Component} from 'react';
import Input from '../components/Input';
//import Button from '../components/Button';
import { Button, Alert, Form, Row, Col, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPaperPlane, faUndoAlt } from "@fortawesome/free-solid-svg-icons";

const regex = {
    'name': RegExp(/^([A-Za-z]{2,})$/),
    'email': RegExp(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/),
    'phone': RegExp(/^([0-9]{10})$/)
};

const initState = () => ({
    formData: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        formErrors: {
            firstName: null,
            lastName: null,
            emailAddress: null,
            phoneNumber: null,
        }
    },
    formValidation: "",
    formValid: 0
});

class FormContainer extends Component {
	constructor(props) {
		super(props);

        this.state = initState();
    }

    formValid = () => {
        let valid = true;

        // validate form errors empty
        Object.values(this.state.formData.formErrors).forEach(val => {
            val !== null && val.length > 0 && (valid = false);
        });

        //validate the form was filled out
        Object.values(this.state.formData).forEach(val => {
            val === "" && (valid = false);
        });

        this.setState({ formValidation: valid ? "" : "Form contains errors, please fill all the fields according to the specified rules." });

        return valid;
    }

    handleResetForm = () => {
        this.setState(initState());
    }

    handleInput = e => {
        e.preventDefault();
        const { value } = e.target;
        const { name } = e.target;

        let formErrors = this.state.formData.formErrors;

        switch (name) {
            case 'firstName':
                formErrors.firstName = !(regex.name.test(value)) ? "At least 2 characters, letters only" : "";
                break;
            case 'lastName':
                formErrors.lastName = !(regex.name.test(value)) ? "At least 2 characters, letters only" : "";
                break;
            case 'emailAddress':
                formErrors.emailAddress = !(regex.email.test(value)) ? "At least 2 characters, only letters allowed" : "";
                break;
            case 'phoneNumber':
                formErrors.phoneNumber = !(regex.phone.test(value)) ? "Exactly 10 characters, only digits allowed" : "";
                break;
            default: break;
        }

        this.formValid();

        this.setState(
            prevState => ({
                formData: {
                    ...prevState.formData,
                    [name]: value
                }
            })
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        
        if (this.formValid(this.state.formData)) {
            const env = process.env;
            if (!env.REACT_APP_EMAILJS_USER || !env.REACT_APP_EMAILJS_TEMPLATE || !env.REACT_APP_EMAILJS_SERVICE) {
                alert("You must provide User ID, Template ID and Service ID in .env file.");
            } else {
                const subject = "Form data received!";
                const message_html = "First Name: " + this.state.formData.firstName + "<br>"
                    + "Last Name: " + this.state.formData.lastName + "<br>"
                    + "Mail Address: " + this.state.formData.emailAddress + "<br>"
                    + "Phone Number: " + this.state.formData.phoneNumber;

                const data = {
                    service_id: env.REACT_APP_EMAILJS_SERVICE,
                    template_id: env.REACT_APP_EMAILJS_TEMPLATE,
                    user_id: env.REACT_APP_EMAILJS_USER,
                    template_params: {
                        'to': this.state.formData.emailAddress,
                        "subject": subject,
                        "message_html": message_html
                    }
                };
                this.sendEmail(data);
            }
        }
    }

    sendEmail = data => {
        const headers = {
            "Content-type": "application/json"
        };

        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        };

        fetch("https://api.emailjs.com/api/v1.0/email/send", options)
            .then((httpResponse) => {
                if (httpResponse.ok) {
                    alert("Your mail was sent!");
                } else {
                    return httpResponse.text()
                        .then(text => Promise.reject(text));
                }
            })
            .catch((error) => {
                console.log("Oops... " + error);
            });
    }

    render() {
        const { formErrors } = this.state.formData;

        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <Row form>
                    <Col sm={12} lg={{ size: 3, offset: 3 }}>
                        <Input
                            type={"text"}
                            label={"First Name"}
                            name={"firstName"}
                            value={this.state.formData.firstName}
                            onChange={this.handleInput}
                            required
                            error={formErrors.firstName}
                        />
                    </Col>
                    <Col sm={12} lg={{ size: 3 }}>
                        <Input
                            type={"text"}
                            label={"Last Name"}
                            name={"lastName"}
                            value={this.state.formData.lastName}
                            onChange={this.handleInput}
                            required
                            error={formErrors.lastName}
                        />
                    </Col>
                </Row>
                <Row form>
                    <Col sm={12} md={{ size: 6, offset: 3 }}>
                        <Input
                            type={"email"}
                            label={"Email Address"}
                            name={"emailAddress"}
                            value={this.state.formData.emailAddress}
                            onChange={this.handleInput}
                            required
                            error={formErrors.emailAddress}
                            addon="@"
                            addonType="prepend"
                        />
                    </Col>
                </Row>
                <Row form>
                    <Col sm={12} md={{ size: 6, offset: 3 }}>
                        <Input
                            type={"text"}
                            label={"Phone Number"}
                            name={"phoneNumber"}
                            value={this.state.formData.phoneNumber}
                            onChange={this.handleInput}
                            required
                            error={formErrors.phoneNumber}
                            addon={
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faPhone} />
                                </InputGroupText>
                            }
                            addonType="append"
                        />
                    </Col>
                </Row>
                <Row form>
                    <Col sm={12} md={{ size: 6, offset: 3 }}>
                        {(this.state.formValidation !== "") && (
                            <Alert color="danger" className="mt-4">Please fill-out all the required fields.</Alert>
                        )}
                        <div className="mt-2">
                            <div className="float-left">
                                <Button color={"primary"}><FontAwesomeIcon icon={faPaperPlane} /> Submit</Button>
                                {/*{` `}<Button color={"warning"}>Another button</Button>*/}
                            </div>
                            <div className="float-right">
                                <Button color={"secondary"} onClick={this.handleResetForm}><FontAwesomeIcon icon={faUndoAlt} /> Reset</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default FormContainer;