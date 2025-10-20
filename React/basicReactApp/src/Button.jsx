 function doSomething(event){
    console.log("Doing Somethning");
    console.log(event);
 }
 
 
 
 function Button(){
    return(
        <div><button onClick={doSomething}>Click Me</button></div>
    )
}
export default Button;