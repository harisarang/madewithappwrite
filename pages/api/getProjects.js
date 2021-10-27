import api from "../../lib/appwrite";

export default async function getProjects(req, res) {
  if (req.method === "GET") {
    const { collectionID } = req.query;
    try {
      const response = await api.listDocuments(collectionID);
      console.log(response);
      res.status(200).json(response);
    } catch {
      res.status(400);
    }
  } else {
    res.status(404);
  }
}
