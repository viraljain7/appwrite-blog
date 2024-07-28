import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                //call another method and redirected to login page
                return this.login({ email, password })
            }
            else {
                return null
            }

        } catch (error) {
            console.log("Appwrite Service :: createAccount :: error::", error);
            throw error;
        }

    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite Service :: login :: error::", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error::", error);
        }
        // eslint-disable-next-line no-unreachable
        return null;
    }

    async logout() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: error::", error);
            throw error;
        }
    }

}


const authService = new AuthService();

export default authService;