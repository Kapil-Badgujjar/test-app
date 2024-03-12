import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";

interface InputBoxProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  name: string;
  isDisabled?: boolean;
}
export const InputBox = ({
  label,
  id,
  type,
  placeholder,
  name,
  isDisabled = false
}: InputBoxProps,) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-black">{label}</label>
      {type === 'password' ? <PasswordInput 
        id={id} 
        name={name}
        placeholder={placeholder}
        disabled={isDisabled} 
      />:<Input
        // className="text-sm font-light outline-none border border-gray-500 p-1 rounded-sm"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
      />}
    </div>
  );
};
