"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbs = [{ href: "/", text: "Home" }].concat(
    pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const breadcrumbText = segment
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      return {
        href,
        text: breadcrumbText,
      };
    })
  );

  return (
    <div className="container py-4 flex items-center gap-3">
      <nav aria-label="breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="text-blue-600 hover:underline"
                >
                  {crumb.text}
                </Link>
              ) : (
                <span className="font-semibold">{crumb.text}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
