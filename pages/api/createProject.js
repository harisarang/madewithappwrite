import api from "../../lib/appwrite";

export default async function createProject(req, res) {
  if (req.method === "POST") {
    const { collectionID } = req.query;
    try {
      await api.createDocument(collectionID, req.body, ["*"], ["*"]);
      res.status(200).json({ message: "Success" });
    } catch {
      res.status(400).json({ message: "Failed" });
    }
  } else {
    res.status(404).json({ message: "Not a POST request" });
  }
}
