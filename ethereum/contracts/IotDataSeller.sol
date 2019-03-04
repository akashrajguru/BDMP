pragma solidity ^0.4.17;

contract IotDataSellerAccountFactory {
    address[] public deployedSellerContract;
    
    function createSellerAccount(uint minimum, string description) public {
        address newSeller = new IotDataSellerAccount(minimum, description, msg.sender);
        deployedSellerContract.push(newSeller);
    }
    
    function getDeployedSellerContract() public view returns (address[]) {
        return deployedSellerContract;
    }
}


contract IotDataSellerAccount {
    
    // iot device data storage 
    struct Data {
        address account_address;
        string deviceId;
        string timestampIOS;
        string ipfs_hash;        
    }
    
    
    // Variables for creating Seller Account
    address public deviceManager;
    uint public minimumPurchasePrice;
    string public dataDescription;
    address[] public buyers;
    
    Data[] public data;
    
    
    modifier restricted() {
        require(msg.sender == deviceManager);
        _;
    }
    
    
    
    function IotDataSellerAccount(uint minimum, string description, address creator) public {
        deviceManager = creator;
        minimumPurchasePrice = minimum;
        dataDescription = description;
    }
    
    
    function purchase() public payable {
        require(msg.value > minimumPurchasePrice);
        buyers.push(msg.sender);
    }

    function getSummary() public view returns (uint, uint, string, address) {
        return (
            minimumPurchasePrice,
            this.balance,
            dataDescription,
            deviceManager
        );
    }
    
    function storeDataRequest(address account_address,string deviceId,string timestampIOS, string ipfs_hash) public restricted {
        Data memory newData = Data({
            account_address: account_address,
            deviceId: deviceId,
            timestampIOS: timestampIOS,
            ipfs_hash: ipfs_hash   
        });
        
        data.push(newData);
    }
    
    
    
    
}