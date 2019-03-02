import React, {Component} from 'react';
import Layout from '../../components/Layout';
import {Button, Form, Input, Message} from  'semantic-ui-react'
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class AccountNew extends Component {
    state = { minimumPurchasePrice: '', dataDescription: '', errorMessage: '', loading: false};

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createSellerAccount(web3.utils.toWei(this.state.minimumPurchasePrice, 'ether'), this.state.dataDescription)
            .send({from: accounts[0]});

            Router.pushRoute('/');
        } catch (error) {
            this.setState({ errorMessage: error.message});
            this.setState({loading: false});
        }

        this.setState({loading: false});
    };


    render() {
        return (
            <Layout>
                <h3>Create a new Account</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                    <label>Set Minimum Purchase Price</label>
                    <Input 
                    label="ether" 
                    labelPosition="right" 
                    value={this.state.minimumPurchasePrice}
                    onChange={event => this.setState({minimumPurchasePrice: event.target.value})}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Data Description</label>
                    <Input 
                    value={this.state.dataDescription}
                    onChange={event => this.setState({dataDescription: event.target.value})}
                    />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary type='submit'>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default AccountNew;