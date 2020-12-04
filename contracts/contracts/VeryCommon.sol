// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";

contract VeryCommon is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable public owner;
    uint256 public priceCollection;
    uint256 public pricePiece;

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    event ChangeCollectionPrice(
        uint256 indexed oldPrice,
        uint256 indexed newPrice
    );

    event ChangePiecePrice(uint256 indexed oldPrice, uint256 indexed newPrice);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 priceCollection_,
        uint256 pricePiece_
    ) public ERC721(name_, symbol_) {
        //set a default price
        priceCollection = priceCollection_;
        pricePiece = pricePiece_;
        //set contract owner
        address msgSender = msg.sender;
        owner = payable(msgSender);
        emit OwnershipTransferred(address(0), msgSender);
    }

    function tokenizeGeneratedArt(address user, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        require(msg.value == pricePiece, "Price too low");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(user, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function transferOwnership(address payable newOwner) public payable {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        require(msg.value == priceCollection);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function changePriceCollection(uint256 newPrice) public payable onlyOwner {
        emit ChangeCollectionPrice(priceCollection, newPrice);
        priceCollection = newPrice;
    }

    function changePricePiece(uint256 newPrice) public payable onlyOwner {
        emit ChangePiecePrice(priceCollection, newPrice);
        pricePiece = newPrice;
    }

    function withdraw() public {
        owner.transfer(address(this).balance);
    }
}
