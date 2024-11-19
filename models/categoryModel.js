import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLenght: 32,
        unique: true,
    }
});

export default mongoose.model('Category', categorySchema);