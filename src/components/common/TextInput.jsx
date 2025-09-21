import { Smiley } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "@/context";
import {Avatar} from "@/components/common";
/**
 * TextInput component
 *
 * A reusable text input component with user avatar, emoji button, and a send button.  
 * Supports pressing Enter to trigger sending. Can be disabled entirely or just disable the send button.
 *
 * @component
 * @param {Object} props
 * @param {string} props.value - Current text value of the input
 * @param {function} props.onChange - Callback triggered when the input value changes
 * @param {function} props.onSend - Callback triggered when the send button is clicked or Enter is pressed
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {boolean} [props.disabled=false] - Optional flag to disable the entire input
 * @param {boolean} [props.sendDisabled=false] - Optional flag to disable only the send button
  */
 
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
