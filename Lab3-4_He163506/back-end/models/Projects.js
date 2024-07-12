import mongoose, {Schema} from "mongoose";

const ProjectsSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    startDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    type:{
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

const Projects = mongoose.model("projects", ProjectsSchema)

export default Projects