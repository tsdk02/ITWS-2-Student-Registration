const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({roll_no: {
    type: String, required: true
},email_id: {
    type: String, required: true
},password: {
    type: String, required: true
},name: {
    type: String, required: true
},gender: {
    type: String, required: true
},dob: {
    type: Date, required: true
},semester: {
    type: Number, required: true
},branch: {
    type: String, required: true
},cgpa: {
    type: Number, required: true
},contact_no: {
    type: Number, required: true
},parent_contact_number: {
    type: Number, required: true
},registration: {
    type: String, required: true
},fee_payment: {
    type: String, required: true
},verification: {
    type: String, required: true
}
})

const User = mongoose.model("studentdetails", UserSchema)

module.exports = User