import BasicInfo from "@/components/profile/BasicInfo";
import PribetRoute from "@/components/routes/PribetRoute";
import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <PribetRoute>
      <div className="flex justify-center px-4 sm:px-0 flex-col mt-10 space-y-10 max-w-4xl mx-auto mb-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-36 h-36 border-4 border-gray-700 rounded-full overflow-hidden cursor-pointer">
            <Image
              src="https://i.ibb.co.com/0BLz9Xc/453273863-1657674491755660-3532183940566294114-n-Copy-2-Copy.jpg"
              alt="Profile Picture"
              width={200}
              height={200}
              className="rounded-full object-cover w-ful h-full"
            />
          </div>
          <h1 className="text-2xl text-gray-300 font-medium">
            Wellcome, Anirban das Joy
          </h1>
        </div>
        <BasicInfo />
      </div>
    </PribetRoute>
  );
};

export default Profile;
