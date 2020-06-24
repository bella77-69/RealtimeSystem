const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');

const Slot = require('../../models/Slot');

// @route 	POST api/slot
// @desc 	Post slot details
// @access 	public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newPost = new Slot({
        name: req.body.name,
        status: req.body.status,
        available: req.body.available,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route 	PUT api/slot
// @desc 	update slot details
// @access 	public
// router.put('/:id/:availableId', async (req, res) => {
//   const { isAvailable } = req.body;
//   try {
//     //   const slot = await Slot.findById(req.params.id);
//     // let slot = await Slot.find(
//     //   { _id: req.params.id },
//     //   { available: { $elemMatch: { _id: req.params.availableId } } }
//     // );
//     await Slot.findOneAndUpdate(
//       { _id: req.params.id, 'available.0': 0 },
//       {
//         $set: { 'available.0': { isAvailable: false } },
//       }
//     );

//     // await slot.available.updateOne(
//     //   { _id: req.params.availableId },
//     //   { $set: { isAvailable: false } }
//     // );
//     res.send('Done');
//     //   const post = await newPost.save();
//     // res.json(slot.available);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Server error');
//   }
// });

router.patch('/:id/:availableId', async (req, res) => {
  //   const updates = Object.keys(req.body);
  //   const allowedUpdates = ['isAvailable'];
  //   const isValidOperation = updates.every((update) =>
  //     allowedUpdates.includes(update)
  //   );

  //   if (!isValidOperation) {
  //     res.status(400).send({ error: 'Invalid Operation!' });
  //   }

  try {
    // const slot = await Slot.findById(req.params.id);
    // const slot = await Slot.find(
    //   { _id: req.params.id },
    //   { available: { $elemMatch: { _id: req.params.availableId } } }
    // );
    await Slot.updateOne(
      { _id: req.params.id, 'available._id': req.params.availableId },
      {
        $set: { 'available.$.isAvailable': false },
      }
    );
    // updates.forEach((update) => (slot[update] = req.body[update]));
    // await slot.save();

    res.send('Successfully Booked');
  } catch (e) {
    res.status(500).send('Server error');
  }
});

// @route 	GET api/slot
// @desc 	GET slot details
// @access 	public
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route 	GET api/slot/:id
// @desc 	GET slot details
// @access 	public
router.get('/:id', async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(slot);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route 	DELETE api/slot/:id
// @desc 	DELETE slot details
// @access 	public
router.delete('/:id', async (req, res) => {
  try {
    await Slot.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Successfully deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
