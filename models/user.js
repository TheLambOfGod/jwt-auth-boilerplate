const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You got it wrong, ass'],
        minLength: [1, 'Too short, ass'],
        maxLength: [99, 'Too long, ass']
    },
    password: {
        type: String, 
        required: [true, 'Enter pissword, ass'],
        minLength: [8, 'Too short of a pissword, ass'],
        maxLength: [128, 'Too long of a pissword, ass']
    },
    email: {
        type: String, 
        required: [true, 'Enter emul, ass'],
        minLength: [5, 'Too short emul, ass'],
        maxLength: [99, 'Too long emul, ass']
    },
});

userSchema.set('toObject', {
    transform: function(doc, ret, options) {
        let returnJson = {
            _id: ret._id,
            email: ret.email,
            name: ret.name
        }
        return returnJson
    }
})

userSchema.pre('save', function(next) {
    if (this.isNew) {
        let hash = bcrypt.hashSync(this.password, 12);
        this.password = hash;
    }
    next();
});

userSchema.methods.authenticated = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

