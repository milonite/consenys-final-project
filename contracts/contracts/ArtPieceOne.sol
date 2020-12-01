// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";

contract ArtPieceOne is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private _owner;
    uint256 private _price;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() public ERC721("ArtPieceOne", "ART1") {
        //set a default price
        uint256 defaultPrice = 2;
        _price = defaultPrice;

        //set contract owner
        address msgSender = msg.sender;
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    function tokenizeGeneratedArt(address user, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        require(msg.value == 0.02 ether);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(user, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function transferOwnership(address newOwner) public payable {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        require(msg.value == 2 ether);
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}
