import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class AccountIndex extends Component {
    static async getInitialProps() {
        const accounts =  await factory.methods.getDeployedSellerContract().call();

        return { accounts };
    }

    renderAccounts() {
        const items = this.props.accounts.map(address => {
            return {
                header: address,
                description: (<Link route={`/accounts/${address}`}><a>View Details</a></Link>),
                fluid: true
            };
        });

        return <Card.Group items={items}/>;
    }

    render() {
        return <Layout>
            <div>
                <h3>Data Sellers List</h3>
                <Link route="/accounts/new">
                    <a>
                        <Button 
                            content="Create Data Account" 
                            icon="add circle"
                            primary 
                            floated="right"
                            />
                    </a>
                </Link>
                
                {this.renderAccounts()}
            </div>
        </Layout> 
    };

}

export default AccountIndex;