// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6 <0.9.0;

import "@chainlink/contracts/src/v0.6/vendor/SafeMathChainlink.sol";

contract SmartContract {
    using SafeMathChainlink for uint256;
    address public owner;
    uint256 public productCount;
    mapping(uint256 => Product) public products;
    mapping(address => uint256) public addressToAmountSent;

    constructor() public{
        owner = msg.sender;
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 stock;
    }

    function addProduct(string memory name, uint256 price, uint256 stock) public onlyOwner {
        productCount++;
        products[productCount] = Product(productCount, name, price, stock);
    }

    function purchaseProduct(uint256 productId, uint256 quantity) public payable {
        // Check validity of productId and quantity
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        require(quantity > 0 && quantity <= products[productId].stock, "Invalid quantity or insufficient stock");

        // Calculate the total amount to be paid
        uint256 totalAmount = products[productId].price * quantity;

        // Ensure sufficient Ether is sent
        require(msg.value >= totalAmount, "Insufficient Ether sent");
        
        addressToAmountSent[msg.sender] -= msg.value;

        // Transfer Ether to owner
        address payable ownerAddress = payable(owner);
        ownerAddress.transfer(totalAmount);

        // Update product stock
        products[productId].stock -= quantity;

        // Refund excess Ether back to the buyer (msg.sender)
        if (msg.value > totalAmount) {
            payable(owner).transfer(msg.value - totalAmount);
        }
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

}