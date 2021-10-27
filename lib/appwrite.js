import { Client, Database } from "node-appwrite";

let api = {
  database: null,

  provider: () => {
    if (api.database) {
      return api.database;
    }
    let client = new Client();
    client
      .setEndpoint(process.env.APPWRITE_URL)
      .setProject(process.env.APPWRITE_PROJECT)
      .setKey(process.env.APPWRITE_KEY);
    let database = new Database(client);
    return database;
  },

  createDocument: (collectionId, data, read, write) => {
    console.log(process.env.APPWRITE_URL);
    return api.provider().createDocument(collectionId, data, read, write);
  },

  listDocuments: (collectionId) => {
    return api.provider().listDocuments(collectionId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().deleteDocument(collectionId, documentId);
  },
};

export default api;
