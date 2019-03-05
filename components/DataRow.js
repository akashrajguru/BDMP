import React, { Component } from 'react';
import { Form, Input, Message, Button, Table } from 'semantic-ui-react';
import Account from '../ethereum/account';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class DataRow extends Component {

    

    // onFinalize = async () =>{
    //     const campaign = Campaign(this.props.address);
    //     const accounts = await web3.eth.getAccounts();

    //     await campaign.methods.finalizeRequest(this.props.id).send({
    //         from: accounts[0]
    //     });
    // }

    render() {
        const { Row, Cell } = Table;
        const {id, data } = this.props;

        return (
            <Row > 
                <Cell>{id}</Cell>
                <Cell>{data.deviceId}</Cell>
                <Cell>{data.timestampIOS}</Cell>
                <Cell>{data.ipfs_hash}</Cell>
            </Row>
        );
    }
}

export default DataRow;