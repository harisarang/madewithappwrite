import api from "../../lib/appwrite";

export default async function uploadImage(req, res) {
  if (req.method === "POST") {
    const { name } = req.query; 
    try {
        let file = new File
        let file = dataURLtoFile(req.body, name);
        console.log(file);
        
      const response = await api.uploadImage(file);
      console.log(response);
      res.status(200).json({ message: "Success", response });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Failed" + err.toString() });
    }
  } else {
    res.status(404).json({ message: "Not a POST request" });
  }
}
