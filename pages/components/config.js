export default function getNftContractAddress(chain) {

const chainId = {
    80001: "0x5b5bcAf1da7a63b75a8d59b080DE7Ddf53315482",
    97: "0xa6a7a9c58f5dB6E9C1affb29A9FBD73390b46174",
    43113: "0xc7cB8779dBE2bA4BB2a618e51097e5a5A0D6a344",
    5: "0x8F9Bdb6C97068D8296F21b6576459fA5F514Fd06"
}

return chainId[chain?.id]
}