//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract kawkaw is ERC20, Ownable {

    uint public price = 2000000;
    uint public _totalSupply = 9000000;
    uint public _supply = _totalSupply * (10 ** decimals());

    address public donkey = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;

    constructor() ERC20("kawkaw","kaw") {
        _mint(donkey,_supply/2);
        _mint(address(this),_supply/2);
    }

    function decimals() public view virtual override returns(uint8){
        return 6;
    }


    function publicSale(uint8 amountToBuy) external payable {

        require(amountToBuy <= ERC20(address(this)).balanceOf(address(this)), "mab9ach");
        require(msg.value == amountToBuy*price, "la mabghitch");

        _transfer(address(this), msg.sender, amountToBuy * (10 ** decimals()));

    }


    function withdraw() external onlyOwner{
        payable(msg.sender).transfer(address(this).balance);
    }


}