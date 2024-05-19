"use client"

import Link from "next/link"


const ProfileList = ({user}) => {
  return (
    <>
        <>
           <ul className="py-4 mx-4 flex flex-col gap-1 ">
              <li>Account</li>
              <li>Profile</li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>Security</li>
              <li>Notification</li>
              <li>Orders</li>
              <li>Logout</li>
           </ul>
          </>
    </>
  )
}

export default ProfileList