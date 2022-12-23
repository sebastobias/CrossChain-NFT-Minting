"use client";
import {
  Button,
  Text,
  Row,
  Card,
  Grid,
  Input,
  Loading,
} from "@nextui-org/react";
import { ethers, providers } from "ethers";
import Image from "next/image";
import {
  useAccount,
  useContract,
  useSigner,
  useProvider,
  useNetwork,
} from "wagmi";
import NFTABI from "../abi/nftabi.json";
import getNftContractAddress from "./config";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MintZone() {
  const provider = useProvider();
  const { address } = useAccount();
  const { chain, chains } = useNetwork();
  const { data: signer } = useSigner({ chainId: chain?.id });

  const [amountInput, setAmountInput] = useState("");
  const [totalMinted, setTotalMinted] = useState(0);

  const [isMinting, setIsMinting] = useState(false);
  const [NFTADDRESS, setNFTADDRESS] = useState("");

  const nftContract = useContract({
    address: NFTADDRESS,
    abi: NFTABI,
    signerOrProvider: signer,
  });

  async function mint() {
    const amount = document.querySelector("#nft-amount").value;
    try {
      const transaction = await nftContract.mint(address, amount);
      setIsMinting(true);
      toast.info("Transaction Submitted");
      await provider.waitForTransaction(transaction.hash);
      toast.success(`${amount} NFTs have been Minted`);
      setIsMinting(false);
    } catch (e) {
      toast.error(`Transaction Error or Rejected`);
      setIsMinting(false);
    }
  }
  //
  useEffect(() => {
    setNFTADDRESS(getNftContractAddress(chain));
    address &&
      signer &&
      provider &&
      nftContract &&
      nftContract?.totalSupply().then((result) => setTotalMinted(result));
  });

  let color =
    chain?.id == 80001
      ? "violet"
      : chain?.id == 5
      ? "black"
      : chain?.id == 43113
      ? "red"
      : chain?.id == 97 && "yellow";

  return (
    <>
      <ToastContainer theme="colored" />
      <Row style={{ marginBottom: "2%" }}>
        <Card css={{ $$cardColor: "#ffa500" }}>
          <Card.Body style={{ overflow: "hidden" }}>
            <Row
              style={{ textAlign: "center" }}
              justify="center"
              align="center"
            >
              <Text
                style={{ textAlign: "center" }}
                color="white"
                h1
                size={60}
                weight="black"
              >
                MINT ZONE
              </Text>
            </Row>

            <Row justify="center" align="center">
              <Text
                style={{ textAlign: "center" }}
                blockquote
                color="white"
                h3
                weight="black"
              >
                {totalMinted !== 0 && chain && (
                  <>
                    You are now Connected to
                    <span style={{ color: color }}> {chain?.name}</span>
                  </>
                )}
              </Text>
            </Row>
            <Grid.Container gap={10}>
              <Grid style={{ padding: "3%" }} xs={12} md={6}>
                <Row justify="flex-start" align="flex-start">
                  <Card>
                    <Card.Image
                      src="https://i.ytimg.com/vi/MLJGi6-o4wo/hqdefault.jpg"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  </Card>
                </Row>
              </Grid>
              <Grid style={{ padding: "3%" }} xs={12} md={6}>
                <Card css={{ $$cardColor: "#ffae00" }}>
                  <Card.Body>
                    <Row justify="center">
                      <Text transform="uppercase" color="white" h2>
                        Do you want to{" "}
                        <span style={{ color: "#003049" }}>buy</span> my eggs?
                      </Text>
                    </Row>
                    <Row justify="center">
                      <Text weight="bold" color="white" h2>
                        Are you Ready to{" "}
                        <span style={{ color: "#003049" }}>CHANGE</span> your
                        LIFE?
                      </Text>
                    </Row>
                    <Row style={{ marginTop: "8.5%" }} justify="center">
                      <Text color="white" h2>
                        {address
                          ? `Total Minted ${totalMinted}/1000`
                          : "Please connect your Wallet"}
                      </Text>
                    </Row>
                    <Row
                      justify="center"
                      style={{ marginTop: "20px", marginBottom: "20px" }}
                    >
                      <Input
                        onChange={(e) => setAmountInput(e.target.value)}
                        id="nft-amount"
                        type="number"
                        fullWidth={true}
                        status="primary"
                        labelPlaceholder="Insert the Amount"
                      ></Input>
                    </Row>
                    <Button
                      id="mint-button"
                      onPress={mint}
                      rounded
                      animated
                      ripple
                      shadow
                      color="primary"
                      disabled={
                        isMinting ? true : amountInput != "" || 0 ? false : true
                      }
                    >
                      {address ? (
                        isMinting ? (
                          <Loading />
                        ) : amountInput != "" || 0 ? (
                          "MINT"
                        ) : (
                          "Insert an Amount"
                        )
                      ) : (
                        "Please connect your Wallet"
                      )}
                    </Button>
                    <Text
                      id="max-nfts"
                      color="white"
                      style={{
                        marginTop: "5%",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                      h4
                      transform="uppercase"
                      weight="bold"
                    >
                      Max 15 NFTs per transaction
                    </Text>
                    <Row
                      style={{ marginTop: "10px", width: "100%" }}
                      justify="space-around"
                    >
                      <Image
                        alt=""
                        src="/../public/logos/polygon.png"
                        width={100}
                        height={100}
                      ></Image>
                      <Image
                        alt=""
                        src="/../public/logos/ethereum.png"
                        width={70}
                        height={100}
                      ></Image>
                      <Image
                        alt=""
                        src="/../public/logos/avax.png"
                        width={100}
                        height={100}
                      ></Image>
                      <Image
                        alt=""
                        src="/../public/logos/bsc.png"
                        width={100}
                        height={100}
                      ></Image>
                    </Row>
                  </Card.Body>
                </Card>
              </Grid>
              <Grid
                xs={12}
                md={12}
                style={{ justifyContent: "center", textAlign: "center" }}
              >
                <Text transform="uppercase" color="white" h3>
                  1000 Unique Eggs, when you buy one you have permanent access
                  to the EGG sect where we share the darkest and most hidden
                  secrets of the egg world{" "}
                </Text>
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}
