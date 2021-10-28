import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import api from "../../lib/appwrite";
import PostView from "../../components/PostView";

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
    <PostView project={project} />
  ) : (
    <div className="min-h-screen bg-primary"></div>
  );
}
