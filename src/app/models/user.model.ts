export interface User {
     id?: string;
     firstName: string;
     lastName?: string;
     email: string;
     password: string;
     confirmPassword: string;
     age?: number
     weddingDate?: Date;
     partnerName?: string;
     partnerAge?: number;
     token?: string;
}