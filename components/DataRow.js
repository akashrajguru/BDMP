import React, { Component } from 'react';
import { Form, Input, Message, Button, Table, Confirm } from 'semantic-ui-react';
import Account from '../ethereum/account';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class DataRow extends Component {
    state = { value: '', TXMessage: '', loading: false, open: false};
    show = () => this.setState({ open: true });
    handleConfirm = () => this.setState({ open: false });
    handleCancel = () => this.setState({ open: false });

    onPurchase = async () => {
        const account = Account(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
                await account.methods.purchase()
                .send({from: accounts[0], value: web3.utils.toWei(this.props.minimumPurchasePrice, 'ether') });
            
                this.setState({ TXMessage: this.props.data.ipfs_hash});
                this.setState({ open: true });
        } catch (error) {
            this.setState({ TXMessage: error.message});
            this.setState({ open: true });
        }
        
    }
    

    render() {
        const { Row, Cell } = Table;
        const {id, data, address, minimumPurchasePrice } = this.props;

        return (
            <Row > 
                <Cell>{id}</Cell>
                <Cell>{data.deviceId}</Cell>
                <Cell>{data.timestampIOS}</Cell>
                <Cell>{data.deviceName}</Cell>
                <Cell>{minimumPurchasePrice} (ether)</Cell>
                <Cell>
                    <Button color="teal" basic onClick={this.onPurchase}>Buy</Button>
                    <Confirm
                        open={this.state.open}
                        content= {this.state.TXMessage}
                        onCancel={this.handleCancel}
                        onConfirm={this.handleConfirm}
                    />
                </Cell>
                <Cell>
              
                </Cell>
            </Row>
        );
    }
}

export default DataRow;