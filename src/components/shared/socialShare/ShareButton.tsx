"use client";


import { useCurrentUrl } from "@/hooks/use-CurrentUrl";
import { useEffect, useRef, useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const ShareButton = ({ product }:any) => {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const CurrentPageurl = useCurrentUrl();
  
  
  const description = product?.description;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | any) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown]);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };



  return (
    <div className="relative">
      <div
        className="flex gap-2 text-gray-600 cursor-pointer hover:text-[#0E79F6]"
        onClick={handleDropdownToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M8.7 10.7l6.6 -3.4" />
          <path d="M8.7 13.3l6.6 3.4" />
        </svg>
        <span>Share</span>
      </div>
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg  p-2 z-10 flex gap-2"
        >
          {CurrentPageurl && (
            <>
              <li>
                <FacebookShareButton
                  url={CurrentPageurl}
                  hashtag="#foodie, #recipe, #Khana_Khazana"
                >
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
              </li>
              <li>
                <EmailShareButton
                  url={CurrentPageurl}
                  subject="Check out this recipe!"
                  body={description}
                  separator=" "
                >
                  <EmailIcon size={24} round />
                </EmailShareButton>
              </li>
              <li>
                <TelegramShareButton url={CurrentPageurl} title={description}>
                  <TelegramIcon size={24} round />
                </TelegramShareButton>
              </li>
              <li>
                <TwitterShareButton
                  url={CurrentPageurl}
                  title={description}
                  hashtags={["foodie", "recipe", "Khana_Khazana"]}
                >
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default ShareButton;