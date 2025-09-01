import { Smiley, PaperPlaneRight } from "phosphor-react";
import { useProfile } from "@/hooks/users";
import { Avatar } from "@/components/common";

export default function TextInput({ value, onChange, onSend, placeholder, disabled }) {
    const { authUser, authUserProfile } = useProfile();

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    const isSendDisabled = disabled || !value.trim();

    return (
        <div className="text__input__container">
            <Avatar
                src={authUserProfile?.user?.image}
                alt={authUser?.name}
                size={30}
                userId={authUser.id}
            />

            <div className="text__input__wrapper">
                {/* Input con botón de emoji dentro */}
                <div className="input__with__emoji">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onKeyPress={handleKeyPress}
                        disabled={disabled}
                    />
                    <button type="button" className="emoji__button">
                        <Smiley className="icon" size={18} weight="regular" />
                    </button>
                </div>
            </div>

            {/* Botón de enviar con icono de Phosphor */}
            <button
                onClick={onSend}
                disabled={isSendDisabled}
                className="send__button"
            >
                <PaperPlaneRight size={20} weight="fill" className="icon" />
            </button>
        </div>
    );
}
