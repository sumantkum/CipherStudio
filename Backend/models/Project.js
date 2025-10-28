import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'File name is required'] 
  },
  content: { 
    type: String, 
    default: '' 
  },
  type: { 
    type: String, 
    required: [true, 'File type is required'] 
  }
});

const ProjectSchema = new mongoose.Schema({
  projectId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    default: 'Untitled Project',
    trim: true,
    maxlength: [50, 'Project name cannot exceed 50 characters']
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'] 
  },
  files: [FileSchema],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Project', ProjectSchema);