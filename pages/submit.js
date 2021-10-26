import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";

export default function Submit() {
  const { register, handleSubmit, reset, watch, formState } = useForm({
    mode: "onChange",
  });

  const updatePost = async ({ content, title, tags }) => {
    reset({ content, title });

    toast.success("Created Post successfully");
  };

  const [preview, setPreview] = useState(false);

  const { isDirty, isValid, errors } = formState;

  return (
    <div className="flex flex-col min-h-screen bg-appPrimary pt-44">
      <h1 className="text-4xl text-center font-bold font-mono text-appwhite mb-10">
        Submit a Project
      </h1>
      <form onSubmit={handleSubmit(updatePost)}>
        {preview && (
          <div className="flex flex-col items-center justify-items-center">
            <div>
              <div className="w-2/3 mx-3 mb-3 px-10 py-5 rounded-lg outline-none text-textSecondary  text-3xl">
                <h3>{watch("title")}</h3>
              </div>
            </div>
            <div className="w-2/3 m-3 px-10 py-3 text-appwhite flex justify-center">
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
            <div className="rounded-lg w-2/3 m-3 p-10 outline-none bg-appSecondary text-appwhite shadow-sm">
              <ReactMarkdown>{watch("content")}</ReactMarkdown>
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
            placeholder="Cool Project"
            {...register("title", {
              required: { value: true, message: "Title is required" },
            })}
          />
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="tags" className="text-textSecondary text-bold">
              Tags
            </label>
          </div>
          <input
            type="text"
            className="w-2/3 mb-3 mx-3 px-5 py-3 rounded-lg outline-none bg-appSecondary text-appwhite shadow-sm"
            name="tags"
            id="tags"
            placeholder="Enter comma separated tags"
            {...register("tags", {
              required: { value: true, message: "Tags is required" },
            })}
          />
          <div className="w-2/3 m-1 flex flex-col items-start justify-start font-semibold">
            <label for="desc" className="text-textSecondary text-bold">
              Description
            </label>
          </div>
          <textarea
            className="rounded-lg w-2/3 mb-3 mx-3 p-5 outline-none bg-appSecondary text-appwhite shadow-sm"
            rows="10"
            name="content"
            id="desc"
            {...register("content", {
              maxLength: { value: 2000, message: "Content is too long" },
              minLength: { value: 10, message: "Content is too small" },
              required: { value: true, message: "Content is required" },
            })}
          ></textarea>
          {errors.content && (
            <p className=" text-appwhite">{errors.content.message}</p>
          )}
          <div className="w-2/3 flex flex-row">
            <button
              type="submit"
              className="bg-primary-solid m-3 p-3 w-1/2 rounded-lg shadow-sm text-appwhite"
              disabled={!isValid || !isDirty}
            >
              Save Changes
            </button>
            <button
              type="button"
              className=" bg-primary-solid m-3 p-3 w-1/2 rounded-lg shadow-sm text-appwhite"
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
