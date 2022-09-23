// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract Aristest {
    string public textRaw;
    address private owner;
    uint256 public angka;

    constructor(){
        owner = msg.sender;

    }

    function setText(string calldata _text) external {
        textRaw = _text;
    }

    function inc() external {
        require(msg.sender == owner,"NOT OWNER");

        angka++;
    }

    function getPemilik() public view returns(address){
        return owner;
    }

}
