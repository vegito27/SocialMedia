// console.log("First")

// const user=getUser(27,"vegito")
// console.log(user)

// console.log("After")



// function getUser(id,username) {

// 	setTimeout(()=>{
// 		console.log("Reading a user from database...")

// 		return {id:id,githubUsername:username}


// 	},3000)

// 	return 1;
// }

// console.log(user)




const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
});
myEmitter.emit('event', 'a', 'b');