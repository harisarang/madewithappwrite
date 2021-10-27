import api from "../../lib/appwrite";

export default async function createProject(req, res) {
  if (req.method === "POST") {
    const { collectionID } = req.query;
    try {
      await api.createDocument(collectionID, req.body, ["*"], ["*"]);
      res.send(200);
    } catch {
      res.send(400);
    }
  } else {
    res.send(404);
  }
}
