// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";

/// @title An infinite art generator
/// @author Milos Costantini
/// @notice This contract is a poc
contract VeryCommon is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /// @title The owner of the contract/collection
    address payable public owner;

    /// @title The price of the contract/collection
    uint256 public priceCollection;

    /// @title The price to generate a piece of the collection
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
    event WithdrawnFunds(uint256 indexed amount);

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

    /// @notice Tokenized the random string that will be used to recreate the image
    /// @param user The addres who will receive the token
    /// @param tokenURI Identifier of the token, in this case is a random string
    /// @return The idem ID
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

    /// @notice Transfer ownership of the contract
    /// @dev Was not possible to ovverride Ownable.sol because requires a certain price as msg value
    /// @param newOwner New smart contract owner (The whole NFT Collection)
    function transferOwnership(address payable newOwner) public payable {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        require(msg.value == priceCollection, "Price too low");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /// @notice Change Price of the smart contract (The NFT collection)
    /// @param newPrice New price for the smart contract
    function changePriceCollection(uint256 newPrice) public payable onlyOwner {
        emit ChangeCollectionPrice(priceCollection, newPrice);
        priceCollection = newPrice;
    }

    /// @notice Change Price to create a piece of the collection
    /// @param newPrice New price for generating a piece
    function changePricePiece(uint256 newPrice) public payable onlyOwner {
        emit ChangePiecePrice(priceCollection, newPrice);
        pricePiece = newPrice;
    }

    /// @notice All the money collected goes to the owner
    function withdraw() public {
        emit WithdrawnFunds(address(this).balance);
        owner.transfer(address(this).balance);
    }
}
