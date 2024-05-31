import { config } from "../config/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      await this.databases.createDocument(
        config.appWriteDatabaseId,
        appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("create post :: ",error);
    }
  }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        }
        catch (error) { 
            console.log("update post :: ",error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                appWriteCollectionId,
                slug
            )
            return true;
        }
        catch (error) {
            console.log("delete post :: " ,error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                appWriteCollectionId,
                slug
            );
        }
        catch (error) {
            console.log( "get post :: " ,error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                appWriteCollectionId,
                queries,
            
                
            )
        }
        catch (error) {
            console.log(" get posts :: ",error)
            return false;
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            )
        }
        catch (error) {
            console.log(" upload file ::  ",error);
        }
    }

    async deleteFile(fileId) {
        try {
             await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId
            )
            return true;

        }
        catch (error) {
            console.log( "delete file :: ",error);
            return false;
        }
    }

    fetFilePreview(fileId) { 
        return this.bucket.getFilePreview(
            config.appWriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default Service;