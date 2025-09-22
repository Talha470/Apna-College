//inherited from error clas of express
class expressError extends Error{
 constructor(status, message){
  super();
  this.status = status;
  this.message = message;
 }
}
module.exports = expressError; 