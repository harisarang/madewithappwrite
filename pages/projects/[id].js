import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { GoMarkGithub } from "react-icons/go";
import { BiLink } from "react-icons/bi";
import Image from "next/image";
import api from "../../lib/appwrite";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  useEffect(() => {
    console.log(id);
    if (id !== undefined) {
      api
        .getDocument(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION, id)
        .then((response) => {
          console.log(response);
          setProject(response);
          setLoading(false);
        });
    }
  }, [id]);

  return !loading ? (
    <div className="flex flex-col items-center justify-items-center bg-appPrimary">
      <div className=" mt-32 flex flex-row items-center justify-center">
        <div className="w-full rounded-lg outline-none text-textSecondary text-center text-3xl">
          <p className="font-bold text-4xl">{project.title}</p>
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
        className="rounded-3xl"
        src={project.image ?? api.getFileView("6179a20071208").href}
        width={500}
        height={500}
        alt={project.title}
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
