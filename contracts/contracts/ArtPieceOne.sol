// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";

contract ArtPieceOne is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("ArtPieceOne", "ART1") {}

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
}
