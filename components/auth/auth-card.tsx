import { AuthHeader } from "./auth-header"
import { AuthFooter } from "./auth-footer"
import { AuthContent } from "./auth-content"

interface AuthCardProps{
    title: string;
    message: string;
    children: React.ReactNode;
    link_href: string;
    linkTitle: string;
}
export const AuthCard = ({title, message, children, link_href, linkTitle}:AuthCardProps) => {
  return (
    <div className="flex flex-col gap-8 bg-white px-8 py-4 rounded-md shadow-md border border-blue-100">
        <AuthHeader title={title} message={message} />
        <AuthContent>
            {children}
        </AuthContent>
        <AuthFooter footerLink={link_href} linkTitle={linkTitle}/>
    </div>
  )
}
