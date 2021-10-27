import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Project() {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        
    })
  return (
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
      <Image
        src="https://eiitsgowqlbvulpsadlu.supabase.in/storage/v1/object/sign/images/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvbG9nby5wbmciLCJpYXQiOjE2MzM4ODg0MTIsImV4cCI6MTk0OTI0ODQxMn0.84dDS-HB6bScz36SnzHnVrn9cxVMgJlhh7onctx4Wfo"
        width={500}
        height={500}
      />
      <div className="flex justify-center">
        <div className="rounded-lg w-1/2 m-3 p-10 outline-none text-appwhite shadow-sm">
          <ReactMarkdown>{"# Description\n" + watch("desc")}</ReactMarkdown>
        </div>
        <div className="flex bg-appPrimary w-1/3 justify-center">
          <div className="flex flex-col justify-center bg-appSecondary mt-20 h-1/4 rounded-3xl">
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
              <ul className="px-1">
                {watch("appwrite")
                  .split(",")
                  .map((appwrite) => {
                    return (
                      <li className="text-appwhite mx-2 p-1 px-3 rounded-full">
                        {appwrite}
                      </li>
                    );
                  })}
              </ul>
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
  );
}
