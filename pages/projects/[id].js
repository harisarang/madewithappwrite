import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { GoMarkGithub } from "react-icons/go";
import { BiLink } from "react-icons/bi";
import Image from "next/image";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  useEffect(() => {
    console.log(id);
    setLoading(true);
    axios({
      baseURL: window.location.origin,
      url: `/api/getProject?collectionID=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION}&documentID=${id}`,
      method: "GET",
    })
      .then((response) => {
        console.log(response.data);
        setProject(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Unable to fetch project", err);
      });
  }, [id]);

  return !loading ? (
    <div className="flex flex-col items-center justify-items-center bg-appPrimary">
      <div className="mt-24">
        <div className="w-2/3 mx-3 mb-3 px-10 py-5 rounded-lg outline-none text-textSecondary text-3xl">
          <h3>{project.title}</h3>
        </div>
      </div>
      <div className="w-2/3 m-3 px-10 py-3 text-appwhite flex justify-center">
        {project.tags.split(",").map((tag) => {
          return (
            <div className="bg-appwhite text-appPrimary mx-2 p-1 px-3 rounded-full">
              {tag}
            </div>
          );
        })}
      </div>
      <Image
        src="https://eiitsgowqlbvulpsadlu.supabase.in/storage/v1/object/sign/images/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbG9nby5wbmciLCJpYXQiOjE2MzM4ODg0MTIsImV4cCI6MTk0OTI0ODQxMn0.84dDS-HB6bScz36SnzHnVrn9cxVMgJlhh7onctx4Wfo"
        width={500}
        height={500}
      />
      <div className="flex justify-center">
        <div className="rounded-lg w-1/2 m-3 p-10 outline-none text-appwhite">
          <ReactMarkdown>{"# Description\n" + project.desc}</ReactMarkdown>
        </div>
        <div className="flex bg-appPrimary w-1/3 justify-center h-1/2">
          <div className="flex flex-col bg-appSecondary mt-20 rounded-3xl h-auto w-2/3">
            <div className="text-appwhite mx-2 my-1 px-5 py-2">
              <a href={project.github}>
                <div className="flex items-center mt-5">
                  <div className="mr-2">
                    <GoMarkGithub />
                  </div>
                  <div>
                    {project.github
                      .replace("http://github.com/", "")
                      .replace("https://github.com/", "")}
                  </div>
                </div>
              </a>
            </div>
            <div className="text-appwhite m-2 px-5 py-2">
              <a href={project.url}>
                <div className="flex items-center">
                  <div className="mr-2">
                    <BiLink />
                  </div>
                  <div>
                    {project.url.replace("https://", "").replace("http://", "")}
                  </div>
                </div>
              </a>
            </div>
            <div className="text-appwhite m-3 px-5">
              <div className="px-1 flex flex-row flex-wrap flex-grow-0">
                {project.appwrite.split(",").map((appwrite) => {
                  return (
                    <div className="text-appwhite my-1 mx-2 p-1 px-3 rounded-full bg-appPrimary">
                      <span className="text-textSecondary"># </span>
                      <span>{appwrite}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-appPrimary"></div>
  );
}
