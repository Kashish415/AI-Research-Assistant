import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import ChatArea from './components/ChatArea';
import { ApiService } from './services/api';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('welcome');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const response = await ApiService.uploadFile(file);
      setUploadedFile(file);
      console.log('File uploaded successfully:', response.message);
      // You could show a success toast here
    } catch (error) {
      console.error('Upload failed:', error);
      // You could show an error toast here
    } finally {
      setIsUploading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'chat':
        return <ChatArea isVisible={true} />;
      case 'summary':
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Paper Summary</h2>
              <p className="text-secondary-400">
                Summary functionality will be implemented here.
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
              <p className="text-secondary-400">
                Settings panel will be implemented here.
              </p>
            </div>
          </div>
        );
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="h-screen flex bg-secondary-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onFileUpload={handleFileUpload}
      />

      {/* Main Content */}
      <motion.div
        className="flex-1 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>

      {/* Upload Progress Overlay */}
      {isUploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-secondary-800 rounded-lg p-6 text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-white">Uploading and processing your research paper...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
