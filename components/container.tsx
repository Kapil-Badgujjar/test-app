export const Container = ({children}:{children: React.ReactNode}) => {
    return (
        <div className="flex-1 px-8">
            {children}
        </div>
    );
}