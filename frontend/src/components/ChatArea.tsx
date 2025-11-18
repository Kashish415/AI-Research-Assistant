import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ApiService, AskResponse } from '../services/api';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatAreaProps {
  isVisible: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ isVisible }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      const response: AskResponse = await ApiService.askQuestion(userMessage.content);

      // Remove loading message and add actual response
      setMessages(prev => prev.filter(msg => !msg.isLoading));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Remove loading message and add error message
      setMessages(prev => prev.filter(msg => !msg.isLoading));

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your question. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message: Message) => {
    if (message.isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start space-x-3 mb-4"
        >
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="message-bubble assistant">
              <div className="flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-start space-x-3 mb-4 ${
          message.sender === 'user' ? 'justify-end' : ''
        }`}
      >
        {message.sender === 'assistant' && (
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot size={16} className="text-white" />
          </div>
        )}
        <div className={`flex-1 ${message.sender === 'user' ? 'flex justify-end' : ''}`}>
          <div className={`message-bubble ${message.sender}`}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md text-sm"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-secondary-800 px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          <div className="text-xs text-secondary-500 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
        {message.sender === 'user' && (
          <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-white" />
          </div>
        )}
      </motion.div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="flex-1 flex flex-col bg-secondary-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center">
                <Bot className="mx-auto text-primary-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-2">Start a Conversation</h3>
                <p className="text-secondary-400 max-w-md">
                  Ask questions about your uploaded research papers. I'm here to help you understand complex topics and extract key insights.
                </p>
              </div>
            </motion.div>
          ) : (
            messages.map(renderMessage)
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-secondary-700 p-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about your research paper..."
              className="w-full px-4 py-3 bg-secondary-800 border border-secondary-600 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-700 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2 focus-ring"
          >
            <Send size={18} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <div className="text-xs text-secondary-500 mt-2">
          Press Enter to send • Shift + Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
