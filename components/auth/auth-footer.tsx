import Link from "next/link"

interface AuthFooterProps{
    footerLink: string;
    linkTitle: string;
}
export const AuthFooter = ({footerLink,linkTitle}:AuthFooterProps) => {
  return (
    <div className="flex justify-center py-4">
        <Link className="text-sm text-blue-500 underline hover:text-blue-300 active:text-blue-700" href={footerLink} >{linkTitle}</Link>
    </div>
  )
}
