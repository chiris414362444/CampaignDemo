const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const buildPath = path.resolve(__dirname, 'build');
const CampaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(CampaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(path.resolve(buildPath, contract.replace(':', '') + '.json'), output[contract]);
}
