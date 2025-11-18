import React from 'react';
import { Brain, FileText, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const WelcomeScreen: React.FC<{}> = () => {
  const features = [
    {
      icon: FileText,
      title: 'PDF Analysis',
      description: 'Upload and analyze research papers with advanced AI processing',
    },
    {
      icon: MessageSquare,
      title: 'Interactive Chat',
      description: 'Ask questions about your research papers and get detailed answers',
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get intelligent summaries and key insights from complex documents',
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Quick analysis and responses powered by cutting-edge AI technology',
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <Brain className="mx-auto text-primary-400" size={80} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold gradient-text mb-4"
          >
            AI Research Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xl text-secondary-300 max-w-2xl mx-auto"
          >
            Transform your research workflow with AI-powered analysis, intelligent summaries,
            and interactive Q&A about your academic papers.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="glass rounded-xl p-6 hover:bg-white hover:bg-opacity-5 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-secondary-400 mb-4">
            Get started by uploading a research paper or asking a question
          </p>
          <div className="flex justify-center space-x-4">
            <div className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors cursor-pointer">
              Upload Paper
            </div>
            <div className="px-6 py-3 glass hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors cursor-pointer">
              Start Chat
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
