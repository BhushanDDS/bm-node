/*
2. Custom Form Validator
Write a function that validates an object like:
{ name: "John", email: "", age: 17 }
Validation rules:
● Name is required
● email must not be empty and should be a valid email
● age must be over 18

*/



const validator = ({ name, email, age }) => {
    try {
        if ((!name || name.trim() === "") && (email || email.trim() === "") && (age || age.trim() === "")) {
            console.log("Please Enter All Values");
        }

        if (age < 18) {
            console.log("Please enter valid age ");

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("please enter valid mail");

        }
    } catch (error) {
        console.log(error);

    }


}


const obj = {
    name: "ss",
    email: "abcs@gmail.com",
    age: 18
}
validator(obj)