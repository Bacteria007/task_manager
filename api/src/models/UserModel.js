const {mongoose} = require('../references/custom_refs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'manager', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

// Define methods to check permissions based on user role
userSchema.methods.canReadTasks = function() {
  return true; // All roles can read tasks
};

userSchema.methods.canEditTasks = function() {
  return this.role === 'manager' || this.role === 'admin'; // Managers and admins can edit tasks
};

userSchema.methods.canAddTask = function() {
  return this.role === 'admin'; // Only admins can add tasks
};

userSchema.methods.canDeleteTask = function() {
  return this.role === 'admin'; // Only admins can delete tasks
};

// Create the User model using the schema
const User = mongoose.model('users', userSchema);

module.exports = User;
