const path  =    require('path');
const solc  =    require('solc');
const fs    =    require('fs-extra');

// Below logic dletes entire build folder 
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read contracts from contracts direcotry and complie. 
const contractPath = path.resolve(__dirname, 'contracts', 'IotDataSeller.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const output = solc.compile(source, 1).contracts;

//Create build folder
fs.ensureDirSync(buildPath);
// Create contracts in build directory
for(let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}