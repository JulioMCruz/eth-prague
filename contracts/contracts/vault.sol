// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenVault is ERC4626 {
    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol
    )
        ERC20(_name, _symbol)
        ERC4626(_asset)
    {}

  
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    /// @dev Override share <-> asset conversion to enforce 1:1 peg
    function _convertToShares(uint256 assets, Math.Rounding) internal pure override returns (uint256) {
        return assets;
    }

    function _convertToAssets(uint256 shares, Math.Rounding) internal pure override returns (uint256) {
        return shares;
    }

    /// @dev Deposit function (uses ERC4626 standard)
    function depositAssets(uint256 _assets) external {
        require(_assets > 0, "Deposit must be greater than zero");
        deposit(_assets, msg.sender);
    }

    function buy ( address _token, uint256 _amount ) external payable returns (uint256) {

       
        
    }

    function sell( address _token, uint256 _amount ) external payable returns (uint256) {


    }

    /// @dev Withdraw function (burns shares and sends USDC)
    function withdrawAssets(uint256 _shares, address _receiver) external {
        require(_shares > 0, "Withdraw must be greater than zero");
        require(_receiver != address(0), "Invalid receiver");
        require(balanceOf(msg.sender) >= _shares, "Not enough shares");

        _burn(msg.sender, _shares);
        IERC20(asset()).transfer(_receiver, _shares);
    }
}
