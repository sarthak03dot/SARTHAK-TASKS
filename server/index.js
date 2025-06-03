const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

function isPrime(n) {
  if(n <= 1) return false;
  for(let i = 2; i <= Math.sqrt(n); ++i) {
    if(n % i == 0) return false;
  }
  return true;
}

app.get("/:number", (req, res) => {
  const num = parseInt(req.params.number);


  const result = isPrime(num);
  res.json({
    number: num,
    isPrime: result,
    message: result
      ? `${num} is a prime number.`
      : `${num} is not a prime number.`,
  });
});

app.listen(5000, () => {
  console.log("Server is listening on port:5000");
});
