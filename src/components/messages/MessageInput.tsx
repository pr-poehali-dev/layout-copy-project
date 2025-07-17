import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface MessageInputProps {
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  onMessageChange,
  onSendMessage
}) => {
  return (
    <div className="bg-white border-t border-gray-200 p-3 md:p-4">
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Написать..."
          className="flex-1 text-sm"
          onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
        />
        <Button onClick={onSendMessage} size="sm" className="px-3">
          <Icon name="Send" size={14} />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;