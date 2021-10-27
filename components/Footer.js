import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-appSecondary py-10 text-appwhite">
      <p className="text-center text-white font-mono text-xl">
        {"</>"} with 💙
        <br />
        By Hari
      </p>
    </div>
  );
}
