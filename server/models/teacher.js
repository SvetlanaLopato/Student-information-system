const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

TeacherSchema.statics.authenticate = ({ email, password }, callback) => {
    Teacher
        .findOne({ email })
        .exec((error, user) => {
            const passwordMatched = comparePasswords(password, user.password);

            return user && passwordMatched
              ? callback(null, user)
              : callback(error);
    });

    function comparePasswords(password, enteredPassword) {
        return password === enteredPassword;
    }
}


let Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;

