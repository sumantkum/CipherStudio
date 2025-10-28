import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectsAPI } from '../utils/api.js';
import { 
  Plus, 
  FolderOpen, 
  Trash2, 
  LogOut, 
  Code2, 
  Moon, 
  Sun,
  Edit3,
  Clock,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [creatingProject, setCreatingProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [editName, setEditName] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getProjects();
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }

    try {
      const response = await projectsAPI.createProject(projectName);
      if (response.data.success) {
        setProjects(prev => [response.data.data, ...prev]);
        setProjectName('');
        setCreatingProject(false);
        navigate(`/ide/${response.data.data.projectId}`);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await projectsAPI.deleteProject(projectId);
      if (response.data.success) {
        setProjects(prev => prev.filter(project => project.projectId !== projectId));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const updateProject = async (projectId, newName) => {
    if (!newName.trim()) {
      setEditingProject(null);
      return;
    }

    try {
      const response = await projectsAPI.updateProject(projectId, { name: newName });
      if (response.data.success) {
        setProjects(prev => prev.map(project => 
          project.projectId === projectId ? response.data.data : project
        ));
        setEditingProject(null);
        setEditName('');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project name');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileCount = (project) => {
    return project.files ? project.files.length : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                CipherStudio
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Projects
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create and manage your React projects
            </p>
          </div>
          
          <button
            onClick={() => setCreatingProject(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus size={20} />
            <span>New Project</span>
          </button>
        </div>

        {/* Create Project Modal */}
        {creatingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create New Project
              </h3>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white mb-4"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') createProject();
                  if (e.key === 'Escape') setCreatingProject(false);
                }}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setCreatingProject(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createProject}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No projects yet
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Get started by creating your first project.
            </p>
            <button
              onClick={() => setCreatingProject(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.projectId}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  {editingProject === project.projectId ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-b border-blue-500 focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') updateProject(project.projectId, editName);
                        if (e.key === 'Escape') {
                          setEditingProject(null);
                          setEditName('');
                        }
                      }}
                      onBlur={() => updateProject(project.projectId, editName)}
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate flex-1">
                      {project.name}
                    </h3>
                  )}
                  
                  <div className="flex space-x-2 ml-2">
                    <button
                      onClick={() => {
                        setEditingProject(project.projectId);
                        setEditName(project.name);
                      }}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      aria-label="Edit project name"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteProject(project.projectId)}
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                      aria-label="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Clock size={14} className="mr-1" />
                  <span>Updated: {formatDate(project.updatedAt)}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <FileText size={14} className="mr-1" />
                  <span>{getFileCount(project)} files</span>
                </div>
                
                <button
                  onClick={() => navigate(`/ide/${project.projectId}`)}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <FolderOpen size={16} />
                  <span>Open Project</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;