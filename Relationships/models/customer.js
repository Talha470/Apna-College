const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log("Connected to MongoDB");
}

// ---------- Order Schema ----------
const orderSchema = new Schema({
    item: String,
    price: Number
});
const Order = mongoose.model("Order", orderSchema);

// ---------- Customer Schema ----------
const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId, ref: "Order"
        }
    ]
});
const Customer = mongoose.model("Customer", customerSchema);

// ---------- Insert Orders (run once) ----------
// const addOrder = async () => {
//     let res = await Order.insertMany([
//         { item: "Laptop", price: 1200 },
//         { item: "Phone", price: 800 },
//         { item: "Tablet", price: 600 }
//     ]);
//     console.log(res);
// };
// addOrder();

// ---------- Insert Customer with Orders ----------
// const addCustomer = async () => {
//     let cust1 = new Customer({ name: "Alice" });

//     let order1 = await Order.findOne({ item: "Laptop" });
//     let order2 = await Order.findOne({ item: "Tablet" });

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result = await cust1.save();
//     console.log(result);
// };
// addCustomer();


const findCustomer = async () => {
    let customerData = await Customer
        .findOne({ name: "Alice" })
        .populate("orders"); // Populate orders with actual order documents
    console.log(customerData);
}
findCustomer();