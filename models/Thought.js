const { Schema, model } = require('mongoose');


const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
          },

        reactionBody: {
            type: String,
            required: true,
            minlength: 1, maxLength: 280
        },

        username: {
            type: String,
            required: true
         },
     
        createdAt: {
             type: Date,
             defult: Date.now,
             get: createdAtVal => date.format(createdAtVal, 'ddd, MMM DD YYYY')
         },


    }
)

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1, maxLength: 280
    },

    username: {
       type: String,
       required: true
    },

    createdAt: {
        type: Date,
        defult: Date.now,
        get: createdAtVal => date.format(createdAtVal, 'ddd, MMM DD YYYY')
    },

    reaction: [ReactionSchema]
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
const Thought = model('Thought', ThoughtSchema);

// export the Pizza model
module.exports = Thought;