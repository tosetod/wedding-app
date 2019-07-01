export interface User {
     id: string;
     firstName: string;
     lastName?: string;
     email: string;
     age?: number
     wedDate?: Date;
     partnerName?: string;
     partnerAge?: number;

    // constructor (email: string, name: string, surname: string = '', age: number = null, date: Date = null, partName: string = '', partAge: number = null) {
    //     this.email = email;
    //     this.firstName = name;
    //     this.lastName = surname;
    //     this.age = age;
    //     this.wedDate = date;
    //     this.partnerName = partName;
    //     this.partnerAge = partAge;
    // }
}