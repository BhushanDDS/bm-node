/*
3. Shopping Cart Processor
Given a cart array of products (each with price, quantity):
● Calculate total price
● Apply a 10% discount if total > 100
● Return the final amount
*/


let cart = [{
        name: "abc",
        price: 120,
        quantity: 3
    },

    {
        name: "dsf",
        price: 89,
        quantity: 2
    },

    {
        name: "sss",
        price: 900,
        quantity: 1
    },

    {
        name: "sdff",
        price: 300,
        quantity: 4
    }
]

const bill = () => {
    try {
        if (cart.length == 0) {
            console.log("Cart is empty");

        }

        const total = cart.reduce((total, val) => { return total + val.price * val.quantity }, 0)
        console.log(`The sum before discounting : ${total}`);

        let finalAmount = total;
        if (total > 100) {
            const discount = total * 0.10;
            finalAmount = total - discount;
            console.log(`Discount applied: ${discount}`);
        } else {
            console.log("No discount applied.");
        }

        console.log(`Final Ammount ${finalAmount}`);
        return finalAmount;




    } catch (error) {
        console.log(error);

    }

}

bill();