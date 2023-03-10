require("@nomicfoundation/hardhat-toolbox");

task("accounts", "afficher tous les comptes", async() =>{
  const accs = await ethers.getSigners();

  for(const i of accs){
    console.log(i.address);
  }

})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
};
