import { Appwrite } from "appwrite";

const appwrite = new Appwrite();

appwrite
  .setEndpoint("http://appwrite.harisaran.live/v1")
  .setProject("6177889fa73b5");

export async function addProjects(object) {
  return await appwrite.database.createDocument("617834a42ee58", object);
}
