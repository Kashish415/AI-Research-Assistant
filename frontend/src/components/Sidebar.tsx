import React from 'react';
import { FileText, MessageSquare, BarChart3, Settings, Upload } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onFileUpload: (file: File) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const menuItems = [
    { id: 'welcome', label: 'Welcome', icon: MessageSquare },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'summary', label: 'Summary', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-secondary-900 text-secondary-100 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-secondary-700">
        <h1 className="text-xl font-bold gradient-text">AI Research Assistant</h1>
        <p className="text-sm text-secondary-400 mt-1">Powered by AI</p>
      </div>

      {/* File Upload */}
      <div className="p-4">
        <label className="block">
          <div className="upload-area cursor-pointer">
            <Upload className="mx-auto mb-2 text-primary-400" size={24} />
            <p className="text-sm text-secondary-300">Upload Research Paper</p>
            <p className="text-xs text-secondary-500 mt-1">PDF files only</p>
          </div>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-300 hover:bg-secondary-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-secondary-700">
        <div className="flex items-center text-xs text-secondary-500">
          <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse-slow"></div>
          Backend Connected
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
