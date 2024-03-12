interface AuthHeaderProps {
  title: string;
  message: string;
}

export const AuthHeader = ({ title, message }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <h3 className="text-sm text-gray-500">{message}</h3>
      </div>
    </div>
  );
};
