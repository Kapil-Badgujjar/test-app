import { Input } from "@/components/ui/input";
import { PasswordInput } from "../password-input";

interface AuthFormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
}
export const AuthFormField = ({
  label,
  id,
  type,
  placeholder,
  name,
  required = false
}: AuthFormFieldProps,) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-black">{label}</label>
      {type === 'password' ? <PasswordInput 
        id={id} 
        name={name}
        placeholder={placeholder}
        required={required}
      />:<Input
        // className="text-sm font-light outline-none border border-gray-500 p-1 rounded-sm"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />}
    </div>
  );
};
