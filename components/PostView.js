import api from "../lib/appwrite";
import ReactMarkdown from "react-markdown";
import { GoMarkGithub } from "react-icons/go";
import { BiLink } from "react-icons/bi";
import Image from "next/image";

export default function PostView({ project }) {
  return (
    <div className="flex flex-col items-center justify-center bg-primary">
      <div
        className="flex justify-center items-center mt-16 relative w-full m-auto"
        style={{ paddingBottom: "20%" }}
      >
        <Image
          src={project.image ?? api.getFileView("6179a20071208").href}
          className={project.image ?? "hidden"}
          layout="fill"
          objectFit="contain"
          height={400}
          alt={project.title}
        />
      </div>
      <div className=" mt-5 flex flex-row items-center justify-center">
        <div className="w-full rounded-lg outline-none text-white font-sans text-center text-3xl">
          <p className="font-bold text-4xl">{project.title}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-row items-center justify-center mb-20">
        <div className="w-full rounded-lg outline-none bg-gradient-to-br from-box-start to-box-end text-white font-sans text-center py-2 px-10">
          <a href={project.url} className="text-white font-extrabold text-md">
            Visit
          </a>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2 m-3 p-10 outline-none text-white bg-secondary shadow-lg rounded-3xl mr-16">
          <div className="flex flex-wrap ">
            {project.tags.split(",").map((tag) => {
              return (
                <div className="text-white p-2 px-5 bg-primary rounded-lg mx-3 my-2">
                  <p className="text-white">{tag}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            <ReactMarkdown>{"# Description\n" + project.desc}</ReactMarkdown>
          </div>
        </div>
        <div className="flex flex-col w-1/3 justify-center h-full">
          <div className="flex flex-col bg-gradient-to-bl from-box-start to-box-end mt-5 pb-5 rounded-3xl h-auto w-2/3 shadow-lg">
            <div className="text-white mx-2 px-5">
              <div className="flex items-start mt-5">
                <div className="font-bold text-2xl">🎈</div>
              </div>
            </div>
            <div className="text-white mx-2 px-5">
              <div className="flex items-start mt-2 mb-3">
                <div className="font-extrabold font-sans text-2xl">
                  Appwrite Features
                </div>
              </div>
            </div>
            {project.appwrite.split(",").map((appwrite) => {
              return (
                <div className="text-white pl-10 pb-1">
                  <a href={project.github} className="text-white">
                    <div className="flex items-center">
                      <div className="mr-2">🏷️</div>
                      <div>{appwrite}</div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col bg-gradient-to-bl from-box-start to-box-end mt-5 rounded-3xl h-auto w-2/3 shadow-lg">
            <div className="text-white mx-2 px-5">
              <div className="flex items-start mt-5">
                <div className="font-bold text-2xl">🔭</div>
              </div>
            </div>
            <div className="text-white mx-2 px-5">
              <div className="flex items-start mt-2">
                <div className="font-extrabold font-sans text-2xl">
                  View More
                </div>
              </div>
            </div>
            <div className="text-white mx-2 px-5">
              <a href={project.github} className="text-white">
                <div className="flex items-center mt-3">
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
            <div className="text-appwhite mx-2 mb-3 px-5 py-2">
              <a href={project.url} className="text-white">
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
          </div>
        </div>
      </div>
    </div>
  );
}
