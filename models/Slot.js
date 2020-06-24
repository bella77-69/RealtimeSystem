const mongoose = require('mongoose')

const SlotSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
    },
    status: {
        type: String,
        required: true
    },
    available: [
        {
            date: {
                type: Date,
                default: Date.now
            }, startTime: {
                type: Number,
                requried: true
            }, endTime: {
                type: Number,
                requried: true
            },
            isAvailable: {
                type: Boolean,
                default: true
            }
        }
    ]
})

module.exports = Slot = mongoose.model('slot', SlotSchema)
