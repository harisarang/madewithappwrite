import api from "../../lib/appwrite";

export default async function getProjects(req, res) {
  if (req.method === "GET") {
    const { collectionID, documentID } = req.query;
    console.log(collectionID, documentID);
    try {
      const response = await api.getDocument(collectionID, documentID);
      res.status(200).json(response);
    } catch {
      res.status(400).json({ message: "unable to fetch project" });
    }
  } else {
    res.status(404).json({ message: "Only GET is method is available" });
  }
}
