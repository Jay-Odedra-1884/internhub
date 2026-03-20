"use client";

import { getUsersDetail } from "@/services/UserApi";
import {
  Album,
  GraduationCap,
  Laptop,
  Mail,
  MapPinHouse,
  NotebookText,
  Phone,
  SchoolIcon,
  User,
  UserStar,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function InternDash() {
  const [user, setUser] = useState<any>([]);
  const [info, setInfo] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);

  const getUser = async () => {
    const res = await getUsersDetail();

    const userData = res.data.data.User[0];

    setUser(userData);
    setInfo(userData.Infos[0]); // ✅ fixed
    setDepartment(userData.Infos[0].Department); // ✅ fixed
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="min-h-[calc(100vh-96px)] px-10 py-5 bg-transparent">
        {/* welcome div */}
        <div className="mt-6 flex">
          <div className="">
            <h1 className="text-5xl font-semibold">Welcome in, {user?.name}</h1>
            <p className="text-3xl bg-blue-100 w-fit px-3 pb-1 rounded-full mt-4 border border-blue-500">
              {user?.role}
            </p>
          </div>
        </div>

        {/* second */}
        <div className="mt-10 flex flex-col gap-3">
          {/* first row */}
          <div className="flex gap-3 justify-between">
            {/* image */}
            {/* <div className="relative rounded-2xl shadow-lg shadow-black/20 overflow-hidden">
              <Image
                src="/Profile.png"
                alt="Profile"
                width={300}
                height={300}
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/50 to-transparent"></div>
            </div> */}

            {/* info card */}
            <div className="rounded-3xl flex flex-col gap-3 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] px-5 py-5 w-1/3">
              <p className="w-full rounded-2xl text-xl font-bold">
                Personal Information
              </p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <User /> {info?.fullName}
              </p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <SchoolIcon /> {info?.college}
              </p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <Phone /> {info?.phone}
              </p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <MapPinHouse /> {info?.address}
              </p>
            </div>

            {/* department card */}
            <div className="rounded-3xl flex flex-col gap-3 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] px-5 py-5 w-1/3">
              <p className="text-xl font-bold">Department</p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <Laptop />
                {department?.name}
              </p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <UserStar />
                {department?.manager?.name} (Manager of this department)
              </p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <Mail />
                {department?.manager?.email}
              </p>
            </div>

            {/* empty card */}
            <div className="rounded-3xl flex flex-col gap-3 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] px-5 py-5 w-1/3">
              <p className="text-xl font-bold">Education</p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <NotebookText />
                {info?.course}
              </p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <GraduationCap />
                {info?.degree}
              </p>
              <p className="w-full flex gap-3 rounded-2xl text-gray-500 text-lg font-bold">
                <SchoolIcon /> {info?.college}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternDash;
