const mongoose = require('mongoose');

let Scheme = mongoose.Schema;
let deviceSchema = new Scheme({
    name:{
        type: String,
        required: [true, 'the name ']
    },
    udid:{
        type: String,
        required: [true, 'the name ']
    },
    platformVersion:{
        type: String,
        required: [true, 'the name ']
    },
    inUse:{
        type: Boolean,
        default: false
    },
    connected:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Device', deviceSchema);
