import { useEffect, useState } from "react";
import dayjs from "dayjs";
import whitelistAddresses from "./res/whitelist.prod.json";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

function App() {
  const [startedAt, setStartedAt] = useState(null);
  const [finishedAt, setFinishedAt] = useState(null);
  const [hexRoot, setHexRoot] = useState("");
  const [hexProof, setHexProof] = useState("");

  useEffect(() => {
    setStartedAt(new Date());
    const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });
    setHexRoot(merkleTree.getHexRoot());
    setFinishedAt(new Date());

    const publicAddress = "0xb85c7F07F0BC493E3f6464daa432E82a29de4362";
    setHexProof(merkleTree.getHexProof(keccak256(publicAddress)));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <p>started at: {dayjs(startedAt).format()}</p>
      <p>started at: {startedAt && startedAt.getMilliseconds()}</p>
      <p>rootHash: {hexRoot}</p>
      <p>hexProof: {hexProof}</p>
      <p>started at: {dayjs(finishedAt).format()}</p>
      <p>finishedAt: {finishedAt && finishedAt.getMilliseconds()}</p>
    </div>
  );
}

export default App;
