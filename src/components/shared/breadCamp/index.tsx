"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const BreadCrumb = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbs = [{ href: "/", text: "Home" }].concat(
    pathSegments.reduce((acc, segment, index) => {
      if (segment.toLowerCase() !== "productdetails") {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const breadcrumbText = segment
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, function (str) {
            return str.toUpperCase();
          });

        acc.push({
          href,
          text: breadcrumbText,
        });
      }
      return acc;
    }, [] as { href: string; text: string }[])
  );

  const breadcrumbs1 = [{ href: "/", text: "Home" }].concat(
    pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const breadcrumbText = segment
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, function (str) {
          return str.toUpperCase();
        });

      return {
        href,
        text: breadcrumbText,
      };
    })
  );

  return (
    <div className="container py-4 flex items-center gap-3">
      {breadcrumbs.map((crumb, index) => (
        <li key={crumb.href}>
          {index < breadcrumbs.length - 1 ? (
            <Link href={crumb.href} className="text-primary text-base">
              {crumb.text}
            </Link>
          ) : (
            <span className="text-gray-600 font-medium">{crumb.text}</span>
          )}
          {index < breadcrumbs.length - 1 && (
            <span className="text-sm text-gray-400">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          )}
        </li>
      ))}
    </div>
  );
};

export default BreadCrumb;
