import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Card, Grid, Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Account from '../../../ethereum/account';
import DataRow from '../../../components/DataRow';
import web3 from '../../../ethereum/web3';

class DataIndex extends Component {

    static async getInitialProps(props) {
        const {address} = props.query;
        const account = Account(address);
        const summary = await account.methods.getSummary().call();
        const minimumPurchasePrice = web3.utils.fromWei(summary[0], 'ether');
        const dataCount = await account.methods.getDataCount().call();
        // const approversCount = await campaign.methods.approversCount().call();

        const datas = await Promise.all(
            Array(parseInt(dataCount)).fill().map((element, index) =>{
                return account.methods.data(index).call()
            })
        );


        return {address, datas, dataCount, minimumPurchasePrice };
     }
 
    renderRow() {
        return this.props.datas.map((data, index) => {
            return <DataRow
                key={index}
                id={index}
                data={data}
                address={this.props.address}
                minimumPurchasePrice={this.props.minimumPurchasePrice}
            />
        })
    } 

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return(
           <Layout>
                <h3 style={{ color: "white" }}>Uploaded Data List</h3>
        
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Device ID</HeaderCell>
                            <HeaderCell>Timestamp</HeaderCell>
                            <HeaderCell>Device Name</HeaderCell>
                            <HeaderCell>Min Price</HeaderCell>
                            <HeaderCell>Buy Data</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
           </Layout>
        );
    }
}

export default DataIndex;