import React, { Component} from 'react';
import Layout from '../../components/Layout';
import Account from '../../ethereum/account';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class AccountShow extends Component {
    static async getInitialProps(props) {
       const account = Account(props.query.address);
       const summary = await account.methods.getSummary().call();
       return {
           address: props.query.address, 
           minimumPurchasePrice: summary[0],
           balance: summary[1],
           dataDescription: summary[2],
           deviceManager: summary[3]

        };
    }

    renderCards() {

        const {
            balance,
            deviceManager,
            minimumPurchasePrice,
            dataDescription
        } = this.props;


        const items = [
            {
                header: deviceManager,
                meta: 'Address of the User Ethereum Account',
                description: 'The Ethereum user created this account and can withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(minimumPurchasePrice, 'ether'),
                meta: 'Minimum Purchase Price (ether)',
                description: 'You must provide at least this much ehter to purchase data '
            },
            {
                header: "Account Description",
                description: dataDescription
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Account Contarct Balance (ethers)',
                description: 'The balance is how much money this contract has.'
            }
         ];

         return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                 <h3>Account Show</h3>
                 <Grid>
                     <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                            </Grid.Column>
                            <Grid.Column width={6}>
                            {/* <ContributeForm  address={this.props.address}/> */}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/accounts/${this.props.address}/requests`}>
                                    <a>
                                        <Button primary >View Requests</Button>
                                    </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                 </Grid> 
            </Layout>
        );
    }
}

export default AccountShow;