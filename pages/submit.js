import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../lib/appwrite";
import PostView from "../components/PostView";
import { useRouter } from "next/router";

export default function Submit() {
  const { register, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
  });

  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const updatePost = async (object) => {
    if (image !== null) {
      Object.assign(object, {
        image: image,
      });
    } else {
      Object.assign(object, {
        image: api.getFileView("6179a20071208").href,
      });
    }
    console.log(object);
    api
      .createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION,
        object,
        ["*"],
        image["*"]
      )
      .then((response) => {
        console.log(response);
        toast.success("Sumbitted project successfully");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Unable to submit project to server. Make sure all the fields are in right format"
        );
      });
  };

  const handleImage = (value) => {
    console.log(value);
    api
      .createFile(value)
      .then((response) => {
        console.log(response);
        setImage(api.getFileView(response["$id"]).href);
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
    <div className="flex flex-col min-h-screen bg-appPrimary pt-16">
      <h1 className="text-4xl text-center font-bold font-sans text-white mb-10">
        Project Submission
      </h1>
      <form onSubmit={handleSubmit(updatePost)}>
        {preview && (
          <div className="flex flex-col justify-center items-center">
            <PostView
              project={{
                title: watch("title"),
                image: image,
                github: watch("github"),
                desc: watch("desc"),
                tags: watch("tags"),
                url: watch("url"),
                appwrite: watch("appwrite"),
                email: watch("email"),
              }}
            />
            <div className="w-2/3 flex flex-row justify-center items-center">
              <button
                type="submit"
                className=" bg-gradient-to-br from-box-start to-box-end text-white m-3 p-3 w-1/2 rounded-lg shadow-sm font-bold"
                disabled={!isValid || !isDirty}
              >
                Save Changes
              </button>
              <button
                type="button"
                className=" bg-gradient-to-br from-box-start to-box-end text-white m-3 p-3 w-1/2 rounded-lg shadow-sm font-bold"
                onClick={() => {
                  setPreview(!preview);
                }}
              >
                {preview ? "Edit" : "Preview"}
              </button>
            </div>
          </div>
        )}
        <div className={preview ? "hidden" : "flex flex-col items-center"}>
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="title" className="text-white text-bold">
              Title
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-secondary text-white shadow-sm"
            name="title"
            id="title"
            required
            placeholder="AppWrite"
            {...register("title", {
              required: { value: true, message: "Title is required" },
            })}
          />
          {errors.title && (
            <div className="flex items-start justify-start w-2/3 mb-5">
              <p className=" text-white">🚨 {errors.title.message}</p>
            </div>
          )}
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="tags" className="text-white text-bold">
              Tags (Comma separated tags)
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-secondary text-white shadow-sm"
            name="tags"
            id="tags"
            required
            placeholder="Flutter, Next.js, PHP, ..."
            {...register("tags", {
              required: { value: true, message: "Tags is required" },
            })}
          />
          {errors.tags && (
            <div className="flex items-start justify-start w-2/3 mb-5">
              <p className=" text-white">🚨 {errors.tags.message}</p>
            </div>
          )}
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="tags" className="text-white text-bold">
              Email
            </label>
          </div>
          <input
            type="email"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-secondary text-white shadow-sm"
            name="email"
            id="email"
            required
            placeholder="mwa@appwrite.io"
            {...register("email", {
              required: { value: true, message: "Email is required" },
            })}
          />
          {errors.email && (
            <div className="flex items-start justify-start w-2/3 mb-5">
              <p className=" text-white">🚨 {errors.email.message}</p>
            </div>
          )}
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="url" className="text-white text-bold">
              URL
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-secondary text-white shadow-sm"
            name="url"
            required
            id="url"
            placeholder="https://appwrite.io/"
            {...register("url", {
              required: { value: true, message: "URL is required" },
            })}
          />
          {errors.url && (
            <div className="flex items-start justify-start w-2/3 mb-5">
              <p className=" text-white">🚨 {errors.url.message}</p>
            </div>
          )}
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="github" className="text-white text-bold">
              Github Repository URL
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-secondary text-white shadow-sm"
            name="github"
            required
            id="github"
            placeholder="https://github.com/appwrite/appwrite"
            {...register("github", {
              required: { value: true, message: "Github URL is required" },
            })}
          />
          {errors.github && (
            <div className="flex items-start justify-start w-2/3 mb-5">
              <p className=" text-white">🚨 {errors.github.message}</p>
            </div>
          )}
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="desc" className="text-white text-bold">
              Description (Supports Markdown)
            </label>
          </div>
          <textarea
            className="rounded-lg w-2/3 mb-3 mx-3 p-5 outline-none bg-secondary text-white shadow-sm"
            rows="10"
            name="desc"
            id="desc"
            required
            placeholder="Description about your project"
            {...register("desc", {
              minLength: { value: 10, message: "Description is too small" },
              required: { value: true, message: "Description is required" },
            })}
          ></textarea>
          {errors.desc && (
            <div className="flex items-start justify-start w-2/3 mb-5">
              <p className=" text-white">🚨 {errors.desc.message}</p>
            </div>
          )}
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="appwrite" className="text-white text-bold">
              Appwrite features (Comma separated)
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-secondary text-white shadow-sm"
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
          {errors.appwrite && (
            <div className="flex items-start justify-start w-2/3 mb-5">
              <p className=" text-white">🚨 {errors.appwrite.message}</p>
            </div>
          )}
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="image" className="text-white text-bold">
              Preview Image
            </label>
          </div>
          <input
            type="file"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-secondary text-white shadow-sm"
            name="image"
            id="image"
            onChange={(event) => handleImage(event.currentTarget.files[0])}
          />
          <div className="w-2/3 flex flex-row">
            <button
              type="submit"
              className="bg-gradient-to-br from-box-start to-box-end text-white m-3 p-3 w-1/2 rounded-lg shadow-sm font-bold"
              disabled={!isValid || !isDirty}
            >
              Save Changes
            </button>
            <button
              type="button"
              className=" bg-gradient-to-br from-box-start to-box-end text-white m-3 p-3 w-1/2 rounded-lg shadow-sm font-bold"
              onClick={() => {
                if (
                  watch("title") &&
                  watch("github") &&
                  watch("tags") &&
                  watch("appwrite") &&
                  watch("url")
                ) {
                  setPreview(!preview);
                } else {
                  console.log({
                    title: watch("title"),
                    image: image,
                    github: watch("github"),
                    desc: watch("desc"),
                    tags: watch("tags"),
                    url: watch("url"),
                    appwrite: watch("appwrite"),
                    email: watch("email"),
                  });
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
