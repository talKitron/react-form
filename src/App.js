import React, { Component } from 'react';
import './App.css';
import FormContainer from './containers/FormContainer';
import Footer from './components/Footer';
import { Container } from 'reactstrap';

class App extends Component {
    render() {
        document.body.classList.add('bg-light');
        return (
            <Container>
                <div className="text-center">
                    <h1 className="display-5">Create-React-App form</h1>
                    <p className="lead">Reactstrap with Font-Awesome,<br /> email sending powered by EmailJS API</p>
                </div>
                <FormContainer />
                <Footer />
            </Container>
        );
    }
}

export default App;
