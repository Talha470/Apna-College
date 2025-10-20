import Price from "./price";
function Product({ title, idx, price, features }) {
    const newprice = ["2000", "3000", "4000", "5000"];
    const oldprice = ["2500", "3500", "4500", "5500"];
    const description = ["Best in class", "Value for money", "Premium Product", "Highly Recommended"];
    const styles = { border: "2px solid black", marginBottom: "15px", borderRadius: "14px", padding: "0 10px 0 10px",  height: "150px" };
    // // let isdiscount = price > 3000 ? "Discount of 10%" : ""
    // const color = {backgroundColor : "Yellow" , color : "Black"}
    // const concolor = {color : "red"}
  return (
    <div style={styles}>

        <h4>{title}</h4>
        <p>{description[idx]}</p>
      <Price oldPrice={oldprice[idx]} newPrice={newprice[idx]} />
      {/* <h3>{title}</h3>
      <h3>Price : {price}</h3>
      {price > 3000 ? <p style={concolor}>Discount of 5%</p> : null}   */}
      {/* <p>Features : {features.map((feature) => {feature} )}</p> */}
      {/* <ul>
        {features.map((f, index) => (
          <li key={index}>{f}</li>
        ))}
      </ul> */}

    </div>
  );
}

export default Product;
