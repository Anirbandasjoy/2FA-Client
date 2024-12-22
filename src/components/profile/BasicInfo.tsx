import Image from "next/image";
import Link from "next/link";
import { FcOk } from "react-icons/fc";
import { IoIosArrowForward } from "react-icons/io";
import Logout from "../shared/logOut/Logout";

export default function BasicInfo() {
  return (
    <div className="flex items-center justify-center w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
      <div className=" w-11/12 py-10 ">
        <h1 className="text-xl font-semibold mb-2 text-gray-300">Your Info</h1>
        <p className="text-sm text-gray-400 mb-6">
          Some info may be visible to other people using AuthNexus services.{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Learn more
          </Link>
        </p>

        {/* Profile Picture */}
        <div className="flex items-center mb-6 hover:bg-gray-800 cursor-pointer py-4 px-4 rounded-sm  ">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
            <Image
              src="https://i.ibb.co.com/0BLz9Xc/453273863-1657674491755660-3532183940566294114-n-Copy-2-Copy.jpg"
              // Replace with your actual image URL
              alt="Profile"
              width={64}
              height={64}
            />
          </div>
          <div className="ml-4">
            <p className="text-gray-300">Profile picture</p>
            <p className="text-gray-400 text-sm">
              A profile picture helps personalize your account
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          {/* Name */}
          <div className="flex justify-between items-center hover:bg-gray-800 cursor-pointer py-4 px-4 rounded-sm border border-gray-800">
            <p className="text-gray-300">Name</p>
            <div className="flex items-center gap-3">
              <p className="text-gray-400">Anirban das joy</p>
              <IoIosArrowForward className="text-xl text-gray-300" />
            </div>
          </div>
          {/* Birthday */}
          <div className="flex justify-between items-center hover:bg-gray-800 cursor-pointer py-4 px-4 rounded-sm border border-gray-800">
            <p className="text-gray-300">Email</p>
            <div className="flex items-center gap-3">
              <p className="text-gray-400">joy600508@gmail.com</p>
              <IoIosArrowForward className="text-xl text-gray-300" />
            </div>
          </div>
          {/* Gender */}
          <div className="flex justify-between items-center hover:bg-gray-800 cursor-pointer py-4 px-4 rounded-sm border border-gray-800">
            <p className="text-gray-300">Password</p>
            <div className="flex items-center gap-3">
              <p className="text-gray-400">12******</p>
              <IoIosArrowForward className="text-xl text-gray-300" />
            </div>
          </div>
          {/* 2fa  */}
          <div className="flex justify-between items-center hover:bg-gray-800 cursor-pointer py-4 px-4 rounded-sm border border-gray-800">
            <p className="text-gray-300">Two Factor Authentication</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FcOk className="text-xl" />
                <p className="text-gray-400">On</p>
              </div>
              <IoIosArrowForward className="text-xl text-gray-300" />
            </div>
          </div>
        </div>
        <div className="w-28 mt-10">
          <Logout />
        </div>
      </div>
    </div>
  );
}
