const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("our tests", function() {

    let owner;
    let notOwner;
    let contract;
    let kawkaw;

    beforeEach("instances", async function(){

        [owner,notOwner] = await ethers.getSigners();

        contract = await ethers.getContractFactory("kawkaw");
        kawkaw = await contract.deploy();

    });


    describe("public sale", function(){
        it("should pass the public sale", async function(){
            await kawkaw.connect(notOwner).publicSale(2, {value: ethers.utils.parseUnits('4000000', 'wei')});

            const contractBalance = await ethers.provider.getBalance(kawkaw.address);

            expect(await contractBalance).to.equal(4000000);
        })
    });


    describe("Withdraw", function () {
        it("Should withdraw to owner", async function () {

            const contractBalance = await ethers.provider.getBalance(kawkaw.address);

            expect(await kawkaw.connect(owner).withdraw()).not.to.be.reverted;
            expect(Number(ethers.utils.formatEther(owner.address))).to.equal(Number(ethers.utils.formatEther(owner.address))+Number(ethers.utils.formatEther(contractBalance)));
        });

        it("Should not withdraw to Non-owner", async function () {

            await expect(kawkaw.connect(notOwner).withdraw()).to.be.revertedWith("Ownable: caller is not the owner");

        });
    });


});