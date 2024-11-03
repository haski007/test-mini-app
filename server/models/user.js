import mongoose from 'mongoose';
import m2s from 'mongoose-to-swagger';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  tgId: {
    type: Number,
    unique: true,
  },
  telegram: {
    notify: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
    },
    chatId: {
      type: String,
    },
  },
  email: {
    type: String,
  },
  twitterId: {
    type: String,
    index: { 
      unique: true, 
      sparse: true,
      partialFilterExpression: { twitterId: { $type: "string" } }
    }
  },
  username: {
    type: String,
  },
  profileURL: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  tokenSecret: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationTokenExpires: {
    type: Date,
  },
  feedbacks: {
    type: Map,
    of: {
      liked: {
        type: Boolean,
      },
      type: {
        type: String,
      },
      feedback: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  },
  roles: [String],
  twitterScore: {
    total: {
      type: Number,
    },
    reasons: {
      type: [String],
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  usersOnboarded: {
    type: Map,
    of: {
      type: Number,
      default: 0
    },
    default: new Map()
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // This ensures createdAt can't be changed after initial creation
  },
});

// Pre-save middleware
userSchema.pre('save', function(next) {
  // Only update updatedAt if this is not a new document
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Add this middleware for updateOne and updateMany operations
userSchema.pre(['updateOne', 'updateMany', 'findOneAndUpdate'], function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

export const User = mongoose.model('User', userSchema);
export const UserSwaggerSchema = m2s(User);
export const isUserAdmin = async (userId) => {
  const user = await User.findById(userId);
  return user && user.roles && user.roles.includes('admin');
};
