import Icon from "@/components/ui/icon";
import { Message } from "./types";

interface MessagesListProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "evilegx" ? "justify-end" : "justify-start"}`}>
          {message.isSystem ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 max-w-full md:max-w-2xl">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-blue-800">{message.text}</p>
                  <span className="text-xs text-blue-600 mt-1 block">{message.timestamp}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={`max-w-[85%] md:max-w-xs lg:max-w-md px-2 md:px-3 py-2 rounded-lg ${
              message.sender === "evilegx" 
                ? "bg-blue-500 text-white" 
                : "bg-white border border-gray-200"
            }`}>
              <p className="text-xs md:text-sm">{message.text}</p>
              <span className={`text-xs mt-1 block ${
                message.sender === "evilegx" ? "text-blue-100" : "text-gray-500"
              }`}>
                {message.timestamp}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;