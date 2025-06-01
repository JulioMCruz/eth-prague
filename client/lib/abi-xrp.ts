export const abi = [
  {
    inputs: [
      { internalType: "address", name: "_assetManager", type: "address" },
      { internalType: "address", name: "_registry", type: "address" },
      { internalType: "address", name: "_router", type: "address" },
      { internalType: "address[]", name: "_swapPath", type: "address[]" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "FTSO_V2_NAME",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "XRP_USD_FEED_ID",
    outputs: [{ internalType: "bytes21", name: "", type: "bytes21" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "assetManager",
    outputs: [{ internalType: "contract IAssetManager", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_lots", type: "uint256" }],
    name: "calculateRedemptionAmountIn",
    outputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOut", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "fxrpToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllPriceInfo",
    outputs: [
      { internalType: "uint256", name: "lotSizeAMG", type: "uint256" },
      { internalType: "uint256", name: "assetDecimals", type: "uint256" },
      { internalType: "uint256", name: "lotSizeFXRP", type: "uint256" },
      { internalType: "uint256", name: "xrpUsdPrice", type: "uint256" },
      { internalType: "uint256", name: "lotValueUSD", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getAssetSettings",
    outputs: [
      { internalType: "uint256", name: "lotSizeAMG", type: "uint256" },
      { internalType: "uint256", name: "assetDecimals", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getLotSizeFXRP",
    outputs: [{ internalType: "uint256", name: "lotSizeFXRP", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getLotValueUSD",
    outputs: [{ internalType: "uint256", name: "lotValueUSD", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getXrpUsdPrice",
    outputs: [
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "int8", name: "decimals", type: "int8" },
      { internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getXrpUsdPriceFormatted",
    outputs: [{ internalType: "uint256", name: "formattedPrice", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "inputToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_lots", type: "uint256" },
      { internalType: "string", name: "_redeemerUnderlyingAddressString", type: "string" }
    ],
    name: "redeem",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "registry",
    outputs: [{ internalType: "contract IFlareContractRegistry", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "router",
    outputs: [{ internalType: "contract ISwapRouter", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_lots", type: "uint256" },
      { internalType: "string", name: "_redeemerUnderlyingAddressString", type: "string" }
    ],
    name: "swapAndRedeem",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      { internalType: "uint256", name: "_redeemedAmountUBA", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" }
    ],
    name: "swapOnly",
    outputs: [{ internalType: "uint256[]", name: "amounts", type: "uint256[]" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "swapPath",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  }
] as const

