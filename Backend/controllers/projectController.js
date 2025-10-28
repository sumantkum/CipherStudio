import { v4 as uuidv4 } from 'uuid';
import Project from '../models/Project.js';


const getDefaultFiles = () => [
  {
    name: 'App.jsx',
    content: `import React, { useState } from 'react';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div style={{ padding: '20px', textAlign: 'center' }}>\n      <h1 style={{ color: 'blue' }}>Welcome to CipherStudio</h1>\n      <p>Start building your React application!</p>\n      \n      <div style={{ margin: '20px' }}>\n        <button \n          onClick={() => setCount(count + 1)}\n          style={{\n            backgroundColor: '#3b82f6',\n            color: 'white',\n            padding: '10px 20px',\n            border: 'none',\n            borderRadius: '5px',\n            cursor: 'pointer'\n          }}\n        >\n          Count: {count}\n        </button>\n      </div>\n\n      <div style={{ marginTop: '20px' }}>\n        <input \n          type=\"text\" \n          placeholder=\"Type something...\"\n          style={{\n            padding: '8px',\n            border: '1px solid #ccc',\n            borderRadius: '4px',\n            width: '200px'\n          }}\n        />\n      </div>\n    </div>\n  );\n}\n\nexport default App;`,
    type: 'jsx'
  },
  {
    name: 'index.js',
    content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<App />);`,
    type: 'js'
  },
  {
    name: 'index.css',
    content: `body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}`,
    type: 'css'
  }
];


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .select('-files'); // Exclude files for listing

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects'
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      projectId: uuidv4(),
      name: name || 'Untitled Project',
      userId: req.user._id,
      files: getDefaultFiles()
    });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project'
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      projectId: req.params.projectId,
      userId: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project'
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { name, files } = req.body;

    const project = await Project.findOneAndUpdate(
      { projectId: req.params.projectId, userId: req.user._id },
      {
        name,
        files,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating project'
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      projectId: req.params.projectId,
      userId: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project'
    });
  }
};