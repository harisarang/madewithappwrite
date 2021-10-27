import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "../lib/appwrite";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .listDocuments(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION)
      .then((response) => {
        console.log(response);
        setProjects([...response.documents.reverse()]);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-appPrimary pt-44">
      <div className="text-appwhite font-mono font-extrabold text-4xl w-2/3 text-center">
        Made with Appwrite
      </div>
      <div className="flex flex-wrap flex-row mt-16 w-2/3 items-center justify-center">
        {projects.map((project) => {
          return (
            <Link href={`/projects/${project.$id}`}>
              <div className="flex flex-col justify-center items-center border-textSecondary shadow-md border-2 rounded-3xl m-4 hover:cursor-pointer">
                <div className="border-textSecondary border-b-2 mb-0 pb-0">
                  <Image
                    className="rounded-t-3xl"
                    src={project.image ?? api.getFileView("6179a20071208").href}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-appwhite font-bold text-lg p-5">
                  {project.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
