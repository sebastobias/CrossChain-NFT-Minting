import { Button, Image, Link, Navbar, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useWeb3Modal } from "@web3modal/react";
import { useWeb3ModalTheme } from "@web3modal/react";
import { useRouter } from "next/router";

export default function Nav() {
  const { address, isConnected } = useAccount();
  const [connected, setIsConnected] = useState(true);
  const [add, setAdd] = useState("");

  const { open } = useWeb3Modal();

  const router = useRouter()

  useEffect(() => {
    setIsConnected(isConnected);
    setAdd(address);
  }, [isConnected, address]);

  const connectButton = (
    <>
      <Button onClick={() => open()} rounded ghost color="primary" shadow>
        <div>
          <Image
            width={27}
            height={27}
            src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
          ></Image>
        </div>
        <div style={{ marginLeft: "5px" }}>
          {connected
            ? `${add?.slice(0, 4)}***${add?.slice(36, 40)}`
            : "Connect your Wallet"}
        </div>
      </Button>
    </>
  );

  const CollapseItems = [
    { href: "my-nfts", label: "My NFTs" },
    { href: "/", label: "Mint" },
  ];

  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Toggle
          css={{ marginRight: "10px" }}
          showIn="sm"
          aria-label="toggle navigation"
        />
        <Image
          width={30}
          height={30}
          src="https://i.pinimg.com/originals/d5/b2/a8/d5b2a8655a0ec8a562a18c589d82f667.png"
        ></Image>
        <Text style={{ marginLeft: "6px" }} h2 weight="extrabold">
          EGGFT
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="sm" variant="highlight">
        <Navbar.Link
          isActive={router.pathname === "/" ? true : false}
          href="/"
        >
          Mint
        </Navbar.Link>
        <Navbar.Link
          isActive={router.pathname === "/my-nfts" ? true : false}
          href="my-nfts"
        >
          My NFTs
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content hideIn="sm">{connectButton}</Navbar.Content>
      <Navbar.Collapse>
        {CollapseItems.map((item) => (
          <Navbar.CollapseItem>
            <Link color="inherit" css={{ minWidth: "100%" }} href={item.href}>
              {item.label}
            </Link>
          </Navbar.CollapseItem>
        ))}
        <Navbar.CollapseItem>{connectButton}</Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
}
