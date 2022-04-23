const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        //what do i put for character count?
    },

    username: {
       type: String,
       required: true
    },
    
    // is this right????? lmao 
    //   reaction: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Thought'
    //     }
    // ],

    createdAt: {
        type: Date,
        defult: Date.now
        //getter method to format the timestamp on query
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
// idk if i did this right for the schema settings

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

// create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;