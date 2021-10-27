import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { GoMarkGithub } from "react-icons/go";
import { BiLink } from "react-icons/bi";
import Image from "next/image";
import api from "../lib/appwrite";

export default function Submit() {
  const { register, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
  });

  const [image, setImage] = useState(null);

  const updatePost = async (object) => {
    console.log(object);
    api
      .createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION,
        object,
        ["*"],
        ["*"]
      )
      .then((response) => {
        console.log(response);
        setImage(api.getFileView(response["$id"]));
        toast.success("Sumbitted project successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to Submit project");
      });
  };

  const handleImage = (value) => {
    console.log(value);
    api
      .createFile(value)
      .then((response) => {
        console.log(response);
        toast.success("Preview image added successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wrong file format");
      });
  };

  const [preview, setPreview] = useState(false);

  const { isDirty, isValid, errors } = formState;

  return (
    <div className="flex flex-col min-h-screen bg-appPrimary pt-44">
      <h1 className="text-4xl text-center font-bold font-mono text-appwhite mb-10">
        Project Submission
      </h1>
      <form onSubmit={handleSubmit(updatePost)}>
        {preview && (
          <div className="flex flex-col items-center justify-items-center">
            <div className="flex flex-row items-center justify-center">
              <div className="w-full rounded-lg outline-none text-textSecondary text-center text-3xl">
                <p className="font-bold text-4xl">{watch("title")}</p>
              </div>
            </div>
            <div className="w-2/3 mb-3 my-3 mt-10 px-10 py-3 text-appwhite flex justify-center">
              {watch("tags")
                .split(",")
                .map((tag) => {
                  return (
                    <div className="bg-appwhite text-appPrimary mx-2 p-1 px-3 rounded-full">
                      {tag}
                    </div>
                  );
                })}
            </div>
            <Image
              src={
                image !== null
                  ? image
                  : "https://eiitsgowqlbvulpsadlu.supabase.in/storage/v1/object/sign/images/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbG9nby5wbmciLCJpYXQiOjE2MzM4ODg0MTIsImV4cCI6MTk0OTI0ODQxMn0.84dDS-HB6bScz36SnzHnVrn9cxVMgJlhh7onctx4Wfo"
              }
              width={500}
              height={500}
              alt={watch("title")}
            />
            <div className="flex justify-center">
              <div className="rounded-lg w-1/2 m-3 p-10 outline-none text-appwhite shadow-sm">
                <ReactMarkdown>
                  {"# Description\n" + watch("desc")}
                </ReactMarkdown>
              </div>
              <div className="flex bg-appPrimary w-1/3 justify-center">
                <div className="flex flex-col justify-center bg-appSecondary mt-20 h-1/3 rounded-3xl">
                  <div className="text-appwhite mx-2 my-1 px-5 py-2">
                    <a href={watch("github")}>
                      <div className="flex items-center">
                        <div className="mr-2">
                          <GoMarkGithub />
                        </div>
                        <div>
                          {watch("github")
                            .replace("http://github.com/", "")
                            .replace("https://github.com/", "")}
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="text-appwhite m-2 px-5 py-2">
                    <a href={watch("url")}>
                      <div className="flex items-center">
                        <div className="mr-2">
                          <BiLink />
                        </div>
                        <div>
                          {watch("url")
                            .replace("https://", "")
                            .replace("http://", "")}
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="text-appwhite m-2 px-5 py-2">
                    <p>Appwrite Features</p>
                    <div className="px-1 flex flex-row flex-wrap">
                      {watch("appwrite")
                        .split(",")
                        .map((appwrite) => {
                          return (
                            <div className="text-appwhite mx-2 p-1 px-3 rounded-full">
                              {appwrite}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/3 flex flex-row">
              <button
                type="submit"
                className="bg-appwhite m-3 p-3 w-1/2 rounded-lg shadow-sm"
                disabled={!isValid || !isDirty}
              >
                Save Changes
              </button>
              <button
                type="button"
                className=" bg-appwhite m-3 p-3 w-1/2 rounded-lg shadow-sm"
                onClick={() => setPreview(!preview)}
              >
                {preview ? "Edit" : "Preview"}
              </button>
            </div>
          </div>
        )}
        <div className={preview ? "hidden" : "flex flex-col items-center"}>
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="title" className="text-textSecondary text-bold">
              Title
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-appSecondary text-appwhite shadow-sm"
            name="title"
            id="title"
            required
            placeholder="AppWrite"
            {...register("title", {
              required: { value: true, message: "Title is required" },
            })}
          />
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="tags" className="text-textSecondary text-bold">
              Tags (Comma separated tags)
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-appSecondary text-appwhite shadow-sm"
            name="tags"
            id="tags"
            required
            placeholder="Flutter, Next.js, PHP, ..."
            {...register("tags", {
              required: { value: true, message: "Tags is required" },
            })}
          />
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="tags" className="text-textSecondary text-bold">
              Email
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-appSecondary text-appwhite shadow-sm"
            name="email"
            id="email"
            required
            placeholder="mwa@appwrite.io"
            {...register("email", {
              required: { value: true, message: "Email is required" },
            })}
          />
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="url" className="text-textSecondary text-bold">
              URL
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-appSecondary text-appwhite shadow-sm"
            name="url"
            required
            id="url"
            placeholder="https://appwrite.io/"
            {...register("url", {
              required: { value: true, message: "url is required" },
            })}
          />
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="github" className="text-textSecondary text-bold">
              Github Repository URL
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-appSecondary text-appwhite shadow-sm"
            name="github"
            required
            id="github"
            placeholder="https://github.com/appwrite/appwrite"
            {...register("github", {
              required: { value: true, message: "Github URL is required" },
            })}
          />
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="desc" className="text-textSecondary text-bold">
              Description (Supports Markdown)
            </label>
          </div>
          <textarea
            className="rounded-lg w-2/3 mb-3 mx-3 p-5 outline-none bg-appSecondary text-appwhite shadow-sm"
            rows="10"
            name="desc"
            id="desc"
            required
            placeholder="Description about your project"
            {...register("desc", {
              maxLength: { value: 2000, message: "Content is too long" },
              minLength: { value: 10, message: "Content is too small" },
              required: { value: true, message: "Content is required" },
            })}
          ></textarea>
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="appwrite" className="text-textSecondary text-bold">
              Appwrite features (Comma separated)
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-appSecondary text-appwhite shadow-sm"
            name="appwrite"
            id="appwrite"
            required
            placeholder="Functions, Database, Users, ..."
            {...register("appwrite", {
              required: {
                value: true,
                message: "Appwrite features is required",
              },
            })}
          />
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="image" className="text-textSecondary text-bold">
              Preview Image
            </label>
          </div>
          <input
            type="file"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-appSecondary text-appwhite shadow-sm"
            name="image"
            id="image"
            placeholder="Functions, Database, Users, ..."
            onChange={(event) => handleImage(event.currentTarget.files[0])}
          />
          {errors.content && (
            <p className=" text-appwhite">{errors.content.message}</p>
          )}
          <div className="w-2/3 flex flex-row">
            <button
              type="submit"
              className="bg-appwhite text-appPrimary m-3 p-3 w-1/2 rounded-lg shadow-sm "
              disabled={!isValid || !isDirty}
            >
              Save Changes
            </button>
            <button
              type="button"
              className=" bg-appwhite text-appPrimary m-3 p-3 w-1/2 rounded-lg shadow-sm"
              onClick={() => {
                if (watch("title")) {
                  setPreview(!preview);
                } else {
                  toast.error("Fill the form before previewing !");
                }
              }}
            >
              {preview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
