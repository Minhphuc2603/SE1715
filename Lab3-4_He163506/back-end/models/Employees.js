import mongoose, {Schema} from "mongoose";

const EmployeesSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    position:{
        type: String,
        required: true
    },
    department:{
        type: Schema.Types.ObjectId,
        ref: 'departments'
    },
},{
    timestamps:true
}
)

const Employees = mongoose.model("employees", EmployeesSchema)

export default Employees