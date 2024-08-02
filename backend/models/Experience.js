const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
    companyName:[{
        type: String,
        required: true, //mandatory to get the job
        },
    ],    
    position:[{
        type: String,
        required: true, //mandatory to get the job
        },
    ],    
    startDate:[
        {
        type: Date,
        required: false, // notmandatory to get the job
        },
    ],    
    endDate:[{
        type: Date,
        required: false, //not mandatory to get the job
        },
    ],
    description:[{
        type: String,
        required: false, // not mandatory to get the job
        },
    ],
    
});
const Experience = mongoose.model("experience", ExperienceSchema);

module.exports = Experience;