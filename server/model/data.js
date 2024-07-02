import mongoose, { Types } from "mongoose";

const DataSchema = mongoose.Schema({
    redirectFrom:{
        type: String
    },
    redirectTo:{
        type: String
    },
    savedDate: {
        type: Date
    },
    Num:{
        type: Number
    }
})

const data = mongoose.model('data', DataSchema)

export default data;