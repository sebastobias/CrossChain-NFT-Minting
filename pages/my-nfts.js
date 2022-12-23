import { ethers } from "ethers";
import {
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from "wagmi";
import NFTABI from "./abi/nftabi.json";
import getNftContractAddress from "./components/config";
import { useEffect, useState } from "react";
import { Button, Card, Col, Grid, Row, Text } from "@nextui-org/react";

export default function MyNfts() {
  const provider = useProvider();
  const { address } = useAccount();
  const { chain, chains } = useNetwork();
  const { data: signer } = useSigner({ chainId: chain?.id });

  const NFTADDRESS = getNftContractAddress(chain);

  const [userNFTs, setUserNfts] = useState([]);

  const nftContract = useContract({
    address: NFTADDRESS,
    abi: NFTABI,
    signerOrProvider: signer,
  });

  async function getAllNFTs() {
    const nfts = await nftContract?.tokensOfOwner(address);
    return nfts;
  }

  useEffect(() => {
    address &&
      signer &&
      chain &&
      provider &&
      getAllNFTs().then((r) => {
        setUserNfts(r);
      });
  }, [chain, address, setUserNfts, provider, nftContract]);

  const nftImage = "https://murderheaddeathclub.com/assets/nft/";

  return (
    <div style={{ justifyContent: "center", textAlign: "center" }}>
      {!address && !signer ? (
        <Text
          h2
          weight="extrabold"
          transform="uppercase"
          blockquote
          style={{ margin: "50px" }}
        >
          Please Connect Your Wallet to see your NFTs
        </Text>
      ) : address && userNFTs?.length >= 1 ? (
        <>
          <Text h2 weight="extrabold" blockquote style={{ margin: "50px" }}>
            Your EGGFTs
          </Text>
          <Grid.Container gap={2} justify="center">
            {userNFTs
              ?.filter((i) => i != 0)
              .map((item) => {
                return (
                  <Grid justify="center" xs={12} sm={4} xl={3}>
                    <Card css={{ mw: "400px" }}>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          css={{ p: 8, borderRadius: "15px" }}
                          src={`${nftImage}${item}.png`}
                        ></Card.Image>
                      </Card.Body>
                      <Card.Footer>
                        <Row wrap="wrap" justify="space-between" align="center">
                          <Text b color="primary">
                            Token ID #{item.toString()}
                          </Text>
                          <Text>EGGFT Exclusive Collection</Text>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                );
              })}
          </Grid.Container>
        </>
      ) : (
        userNFTs?.length == 0 && (
          <Text
            h2
            weight="extrabold"
            transform="uppercase"
            blockquote
            style={{ margin: "50px" }}
          >
            You don't have any NFT
          </Text>
        )
      )}
    </div>
  );
}
