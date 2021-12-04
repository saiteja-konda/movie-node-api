const express = require("express");
const router = express.Router();
const Address = require("../models/address");

// Getting all
router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getAddressByUserId, (req, res) => {
  res.json(res.address);
});

// Creating one
router.post("/", async (req, res) => {
  const address = new Address({
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    lastName: req.body.lastName,
    city: req.body.city,
    line1: req.body.line1,
    line2: req.body.line2,
    state: req.body.state,
    type: req.body.type,
    zipcode: req.body.zipcode,
    userId:req.body.userId
  });
  try {
    const newAddress = await address.save();
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', getAddress, async (req, res) => {
  if (req.body.name != null) {
    res.address.name = req.body.name
  }
  if (req.body.image != null) {
    res.address.image = req.body.image
  }
  if (req.body.info != null) {
    res.address.info = req.body.info
  }
  try {
    const updateAddress= await res.address.save()
    res.json(updateAddress)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getAddress, async (req, res) => {
  try {
    await res.address.remove()
    res.json({ message: 'Address deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


async function getAddress(req, res, next) {
  let address;
  try {
    address = await Address.findById(req.params.id);
    if (address == null) {
      return res.status(404).json({ message: "Cannot find Address" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.address = address;
  next();
}


async function getAddressByUserId(req, res, next) {
    let address;
    try {
      address = await Address.find({userId: req.params.id});
      if (address == null) {
        return res.status(404).json({ message: "Cannot find Address" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.address = address;
    next();
  }

module.exports = router;
