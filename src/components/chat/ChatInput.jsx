import '../../styles/Messages.css';

function ChatInput({ value, onChange, onSend, placeholder, disabled, avatarUrl }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSend();
        }
    };

    const isSendDisabled = disabled || !value.trim();

    return (
        <div className="chat-input-container">
            {avatarUrl ? (
                <img src={avatarUrl} alt="User Avatar" className="chat-input-avatar" />
            ) : (
                <div className="chat-input-avatar placeholder">👤</div>
            )}
            <div className="chat-input-wrapper">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                    disabled={disabled}
                />
                <button onClick={onSend} disabled={isSendDisabled} className="send-button">
                    ➤
                </button>
            </div>
        </div>
    );
}

export default ChatInput;