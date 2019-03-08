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
        string deviceName;
        string timestampIOS;
        string ipfs_hash;        
    }
    
    
    // Variables for creating Seller Account
    address public deviceManager;
    uint public minimumPurchasePrice;
    string public dataDescription;
    // address[] public buyers;
    
    mapping(address => bool) public buyers;
    uint public buyersCount;
    
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
        // require(msg.value > minimumPurchasePrice);
        buyers[msg.sender] = true;
        buyersCount++;
    }

    function getSummary() public view returns (uint, uint, string, address) {
        return (
            minimumPurchasePrice,
            this.balance,
            dataDescription,
            deviceManager
        );
    }
    
    function storeDataRequest(address account_address,string deviceId, string deviceName, string timestampIOS, string ipfs_hash) public restricted {
        Data memory newData = Data({
            account_address: account_address,
            deviceId: deviceId,
            deviceName: deviceName,
            timestampIOS: timestampIOS,
            ipfs_hash: ipfs_hash   
        });
        
        data.push(newData);
    }
    
    
    function getDataCount() public view returns (uint) {
        return data.length;
    }
    
    function etherTransfer() public restricted {
        // deviceManager.transfer(this.balance);
        msg.sender.transfer(this.balance);
    }   
}