import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../context/useAuth';
import SearchBar from '../components/SearchBar';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import api from '../utils/api';

const Chat = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Initialize Socket.IO connection
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      auth: { token }
    });

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO');
      newSocket.emit('authenticate', user.id);
    });

    newSocket.on('receive-message', (message) => {
      if (selectedUser && 
          (message.sender === selectedUser._id || message.receiver === selectedUser._id)) {
        setMessages(prev => [...prev, message]);
      }
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.close();
    };
  }, [token, user, selectedUser, navigate]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedUser) return;
      
      try {
        const response = await api.get(`/messages/${selectedUser._id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [selectedUser]);

  const handleSendMessage = async (content) => {
    if (!selectedUser) return;

    try {
      socket.emit('send-message', {
        senderId: user.id,
        receiverId: selectedUser._id,
        content
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Chat</h2>
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
        <SearchBar onUserSelect={setSelectedUser} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b bg-white">
              <h3 className="text-lg font-semibold">{selectedUser.fullName}</h3>
              <p className="text-sm text-gray-500">@{selectedUser.username}</p>
            </div>
            <ChatWindow messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
