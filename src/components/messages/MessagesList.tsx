import Icon from "@/components/ui/icon";
import { Message } from "./types";

interface MessagesListProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-1 md:space-y-2">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "evilegx" ? "justify-end" : "justify-start"}`}>
          {message.isSystem ? (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-2 max-w-full md:max-w-2xl">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={12} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-blue-800 leading-snug">{message.text}</p>
                  <span className="text-xs text-blue-600 mt-0.5 block opacity-75">{message.timestamp}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={`max-w-[80%] md:max-w-sm px-2 py-1.5 rounded-lg ${
              message.sender === "evilegx" 
                ? "bg-blue-500 text-white" 
                : "bg-white border border-gray-200"
            }`}>
              <p className="text-xs leading-snug">{message.text}</p>
              <span className={`text-xs mt-0.5 block opacity-70 ${
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