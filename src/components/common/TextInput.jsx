// Componente para input de texto con avatar, emoji y botón de enviar - Props: value (string), onChange (function), onSend (function), placeholder (string), disabled (boolean, opcional), sendDisabled (boolean, opcional)
import { Smiley } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "@/context";
import {Avatar} from "@/components/common";

export default function TextInput({ value, onChange, onSend, placeholder, disabled, sendDisabled }) {
    const { user } = useContext(AuthContext);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSend();
        }
    };

    const isSendDisabled = disabled || sendDisabled;
    return (
        <div className="text__input__container">
            <Avatar
                src={user?.image}
                alt={user?.name}
                size={30}
                userId={user?._id}
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

            {/* Botón de enviar fuera, a la derecha */}
            <button
                onClick={onSend}
                disabled={isSendDisabled}
                className="send__button"
            >
                ➤
            </button>
        </div>
    );
}
