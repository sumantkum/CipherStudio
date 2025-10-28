import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectsAPI } from '../utils/api.js';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from '@codesandbox/sandpack-react';
import {
  Save,
  FolderOpen,
  Home,
  Plus,
  Trash2,
  FileText,
  Moon,
  Sun,
  CheckCircle,
  XCircle
} from 'lucide-react';

const IDE = () => {
  const [project, setProject] = useState(null);
  const [files, setFiles] = useState({});
  const [activeFile, setActiveFile] = useState('/App.jsx');
  const [darkMode, setDarkMode] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState('idle');

  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getProject(projectId);
      if (response.data.success) {
        const projectData = response.data.data;
        setProject(projectData);
        
        // Yeh THEEK tarika se files ko set karein
        const filesObject = {};
        projectData.files.forEach(file => {
          filesObject[`/${file.name}`] = {
            code: file.content
          };
        });
        setFiles(filesObject);
        
        // Active file set karein
        const appFile = projectData.files.find(f => f.name === 'App.jsx');
        setActiveFile(appFile ? `/App.jsx` : `/${projectData.files[0]?.name}`);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('Project not found');
      navigate('/');
    }
  };

  // YEH NAYA FUNCTION ADD KAREIN - Files update hone par call hoga
  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  const saveProject = async () => {
    if (!project || saving || Object.keys(files).length === 0) return;

    setSaving(true);
    setSaveStatus('saving');
    
    try {
      const projectFiles = Object.entries(files).map(([path, file]) => ({
        name: path.substring(1),
        content: file.code,
        type: path.split('.').pop() || 'js'
      }));

      const response = await projectsAPI.updateProject(projectId, {
        name: project.name,
        files: projectFiles
      });

      if (response.data.success) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setSaving(false);
    }
  };

  // Auto-save effect
  useEffect(() => {
    if (autoSave && project && Object.keys(files).length > 0) {
      const saveTimeout = setTimeout(saveProject, 2000);
      return () => clearTimeout(saveTimeout);
    }
  }, [files, autoSave]);

  const createNewFile = () => {
    const fileName = prompt('Enter file name (e.g., Component.jsx):');
    if (!fileName) return;

    const newFilePath = `/${fileName}`;
    if (files[newFilePath]) {
      alert('File already exists!');
      return;
    }

    const fileExtension = fileName.split('.').pop() || 'js';
    let defaultContent = '';

    switch (fileExtension) {
      case 'jsx':
      case 'js':
        defaultContent = `import React from 'react';\n\nexport default function ${fileName.split('.')[0]}() {\n  return (\n    <div>\n      <h1>${fileName.split('.')[0]} Component</h1>\n      <p>This is a new component</p>\n    </div>\n  );\n}`;
        break;
      case 'css':
        defaultContent = `/* ${fileName} */\nbody {\n  margin: 0;\n  padding: 0;\n}`;
        break;
      default:
        defaultContent = `// ${fileName}`;
    }

    setFiles(prev => ({
      ...prev,
      [newFilePath]: {
        code: defaultContent
      }
    }));
    setActiveFile(newFilePath);
  };

  const deleteFile = (filePath) => {
    if (Object.keys(files).length <= 1) {
      alert('Cannot delete the last file!');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${filePath}?`)) {
      setFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[filePath];
        return newFiles;
      });

      const otherFiles = Object.keys(files).filter(path => path !== filePath);
      if (otherFiles.length > 0 && activeFile === filePath) {
        setActiveFile(otherFiles[0]);
      }
    }
  };

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white truncate max-w-xs">
              {project.name}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Auto Save Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoSave"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="hidden"
              />
              <label
                htmlFor="autoSave"
                className={`flex items-center space-x-2 text-sm cursor-pointer ${
                  autoSave ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
                  autoSave ? 'bg-green-500 border-green-500' : 'border-gray-400'
                }`}></div>
                <span className="hidden sm:inline">Auto Save</span>
              </label>
            </div>

            {/* Save Status */}
            <div className="flex items-center space-x-2">
              {saveStatus === 'saving' && (
                <div className="flex items-center space-x-1 text-yellow-600">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-600"></div>
                  <span className="text-sm hidden sm:inline">Saving...</span>
                </div>
              )}
              {saveStatus === 'saved' && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-sm hidden sm:inline">Saved</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center space-x-1 text-red-600">
                  <XCircle size={16} />
                  <span className="text-sm hidden sm:inline">Save Failed</span>
                </div>
              )}
            </div>

            {/* Manual Save Button */}
            <button
              onClick={saveProject}
              disabled={saving}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main IDE Content */}
      <div className="flex-1 flex">
        {/* YEH SABSE IMPORTANT CHANGE HAI - SandpackProvider ko properly configure karein */}
        <SandpackProvider
          template="react"
          theme={darkMode ? 'dark' : 'light'}
          files={files}
          options={{
            visibleFiles: Object.keys(files), // Saari files dikhao
            activeFile: activeFile,
            showTabs: true,
            showLineNumbers: true,
            showInlineErrors: true,
            wrapContent: true,
            closableTabs: true,
            externalResources: [] // External resources add kar sakte hain agar chahiye
          }}
          customSetup={{
            dependencies: {
              'react': '^18.2.0',
              'react-dom': '^18.2.0'
            },
            // YEH ADD KAREIN - Proper entry point
            entry: '/index.js'
          }}
        >
          {/* Sidebar */}
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={createNewFile}
                className="w-full flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
              >
                <Plus size={16} />
                <span>New File</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Files
                </h3>
                <div className="space-y-1">
                  {Object.keys(files).map((filePath) => (
                    <div
                      key={filePath}
                      className={`flex items-center justify-between group p-2 rounded-lg cursor-pointer ${
                        activeFile === filePath
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveFile(filePath)}
                    >
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <FileText size={14} />
                        <span className="text-sm truncate">
                          {filePath.split('/').pop()}
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFile(filePath);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-all"
                        aria-label={`Delete ${filePath}`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Editor and Preview */}
          <div className="flex-1 flex flex-col">
            <SandpackLayout>
              <SandpackCodeEditor
                showTabs
                closableTabs
                showLineNumbers
                showInlineErrors
                wrapContent
                style={{
                  height: '100%',
                  minHeight: '400px'
                }}
                // YEH ADD KAREIN - Code change handle karne ke liye
                onCodeUpdate={(newCode, oldCode) => {
                  // Automatically update files state when code changes
                  setFiles(prev => ({
                    ...prev,
                    [activeFile]: {
                      ...prev[activeFile],
                      code: newCode
                    }
                  }));
                }}
              />
              <SandpackPreview
                showRefreshButton
                showOpenInCodeSandbox={false}
                style={{
                  height: '100%',
                  minHeight: '400px'
                }}
              />
            </SandpackLayout>
          </div>
        </SandpackProvider>
      </div>
    </div>
  );
};

export default IDE;