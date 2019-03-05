import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Card, Grid, Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Account from '../../../ethereum/account';
import DataRow from '../../../components/DataRow';

class DataIndex extends Component {

    static async getInitialProps(props) {
        const {address} = props.query;
        const account = Account(address);
        const dataCount = await account.methods.getDataCount().call();
        // const approversCount = await campaign.methods.approversCount().call();

        const datas = await Promise.all(
            Array(parseInt(dataCount)).fill().map((element, index) =>{
                return account.methods.data(index).call()
            })
        );


        return {address, datas, dataCount };
     }
 
    renderRow() {
        return this.props.datas.map((data, index) => {
            return <DataRow
                key={index}
                id={index}
                data={data}
                address={this.props.address}
            />
        })
    } 

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return(
           <Layout>
                <h3>Uploaded Data List</h3>
        
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Device ID</HeaderCell>
                            <HeaderCell>Timestamp</HeaderCell>
                            <HeaderCell>IPFS HASH</HeaderCell>
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