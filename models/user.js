const dynamoose = require("dynamoose");

const UserSchema = new dynamoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
}, {
    "saveUnknown": true,
    "timestamps": true
});

module.exports = dynamoose.model('Users', UserSchema);