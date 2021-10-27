import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios({
      baseURL: window.location.origin,
      url: `/api/getProjects?collectionID=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION}`,
      method: "GET",
    })
      .then((response) => {
        console.log(response.data);
        setProjects(response.data.documents);
      })
      .catch(() => {
        console.log("Unable to fetch projects");
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
                <div className="border-textSecondary border-b-2">
                  <Image
                    src="https://eiitsgowqlbvulpsadlu.supabase.in/storage/v1/object/sign/images/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbG9nby5wbmciLCJpYXQiOjE2MzM4ODg0MTIsImV4cCI6MTk0OTI0ODQxMn0.84dDS-HB6bScz36SnzHnVrn9cxVMgJlhh7onctx4Wfo"
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
