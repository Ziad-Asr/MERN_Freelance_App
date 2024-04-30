import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    }, // I made to be ease to get the conversation id from any conversation, (sellerID + buyerID)
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    readBySeller: {
      type: Boolean,
      required: true,
    }, // changes if 1) the seller sent a message, 2) The seller made the message as read.
    readByBuyer: {
      type: Boolean,
      required: true,
    }, // changes if 1) the buyer sent a message, 2) The buyer made the message as read.
    lastMessage: {
      type: String,
      required: false,
    }, // every time a message is received or sent, I will change the last message of this conversation
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
