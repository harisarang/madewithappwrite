import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-primary py-10 text-appwhite">
      <p className="text-center text-white font-sans text-xl font-bold">
        {"</>"} with 💙 By{" "}
        <a
          className="underline text-white"
          href="https://github.com/harisarang"
        >
          Hari
        </a>
      </p>
    </div>
  );
}
