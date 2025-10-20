function OnSubmit(event){
    console.log("Form Submitted");
    // event.preventDefault();
}

function Form(){
    return (
        <form onSubmit={OnSubmit}>
            <input type="text" placeholder="Write Something" />
            <button>Submit</button>
        </form>
    )
}
export default Form;