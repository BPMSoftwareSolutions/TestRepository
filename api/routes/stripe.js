const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const cors = require("cors");

router.use(
  cors({
    origin: "*"
  })
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {

        res.setHeader(process.env.ALLOW_CORS, "*");
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;