import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";

interface InputBoxProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  name: string;
  isDisabled?: boolean;
  required?: boolean;
}
export const InputBox = ({
  label,
  id,
  type,
  placeholder,
  name,
  isDisabled = false,
  required = false
}: InputBoxProps,) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-black">{label}</label>
      {type === 'password' ? <PasswordInput 
        id={id} 
        name={name}
        placeholder={placeholder}
        disabled={isDisabled} 
        required={required}
      />:<Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
        required={required}
      />}
    </div>
  );
};
