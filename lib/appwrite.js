import { Appwrite } from "appwrite";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite
      .setEndpoint("http://appwrite.harisaran.live/v1")
      .setProject("6177889fa73b5");
    api.sdk = appwrite;
    return appwrite;
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, data, read, write);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(collectionId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};

export default api;
