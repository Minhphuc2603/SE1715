import mongoose, {Schema} from "mongoose";

const DepartmentsSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
},{
    timestamps:true
}
)

const Departments = mongoose.model("departments", DepartmentsSchema)

export default Departments