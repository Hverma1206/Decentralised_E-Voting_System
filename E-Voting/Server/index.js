const express = require("express");
const Web3 = require("web3"); // Use Web3 from the 'web3' package
const cors = require("cors");
const ABI = require("./ABI.json");
const app = express();

app.use(cors());
app.use(express.json());

const web3 = new Web3("http://127.0.0.1:7545"); // Ensure Ganache or blockchain is running
const contractAddress = "0x1BD40Bcdf6D82d0b0e99a013F95503721287fa16";
const contract = new web3.eth.Contract(ABI, contractAddress);

const genderVerification = (gender) => {
  const genderValue = gender.toLowerCase();
  return (
    genderValue === "male" ||
    genderValue === "female" ||
    genderValue === "other"
  );
};

const partyClash = async (party) => {
  try {
    const candList = await contract.methods.candidateList().call();
    return candList.some((candidate) => candidate.party === party);
  } catch (error) {
    console.error("Error fetching candidate list:", error);
    return false;
  }
};

app.post("/api/candidate-verify", async (req, res) => {
  const { gender, party } = req.body;

  const genderStatus = genderVerification(gender);
  const partyClashStatus = await partyClash(party);
  
  if (genderStatus) {
    if (!partyClashStatus) {
      res.status(200).json({ message: "Registration Successful" });
    } else {
      res.status(403).json({ message: "Party name clashes" });
    }
  } else {
    res.status(403).json({ message: "Gender Value invalid" });
  }
});

// Endpoint to register a candidate
app.post("/api/register-candidate", async (req, res) => {
  const { name, party, age, gender, account } = req.body;

  try {
    await contract.methods.candidateRegister(name, party, age, gender)
      .send({ from: account, gas: 480000 });
    res.status(200).json({ message: "Candidate registration successful" });
  } catch (error) {
    console.error("Error registering candidate:", error);
    res.status(500).json({ message: "Error registering candidate" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
