const express = require("express");
const { Web3 } = require("web3");
const app = express();
const cors=require("cors");
const ABI = require("./ABI.json");
app.use(cors);
app.use(express.json()); //middleware between express.json and postman(which works as dummy frontend)
const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x1BD40Bcdf6D82d0b0e99a013F95503721287fa16";
const contract = new web3.eth.Contract(ABI, contractAddress);
console.log(contract);
const genderVerification = (gender) => {
  genderValue = gender.toLowerCase();
  if (
    genderValue === "male" ||
    genderValue === "female" ||
    genderValue === "other"
  ) {
    return true;
  } else {
    return false;
  }
};
const partyClash = async (party) => {
  const candList = await contract.methods.candidateList().call();
  // console.log(candList);
  const exist = candList.some((candidate) => candidate.party === party);
  return exist;
};
app.post("/api/candidate-verify", async (req, res) => {
  const { gender, party } = req.body;
  const genderStatus = genderVerification(gender);
  const partyClashStatus = await partyClash(partyName);
  console.log(genderStatus, partyClashStatus);
  if (genderStatus === true) {
    if (partyClashStatus === false) {
      res.status(200).json({ message: "Registration Successful" });
    } else {
      res.status(403).json({
        message: "Party name clashes",
      });
    }
  } else {
    res.status(403).json({ message: "Gender Value invalid" });
  }
});

partyClash();
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running at 3000");
});
