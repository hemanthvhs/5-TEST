// Creates Buffer of length 10 with zero filled
const buff1 = Buffer.alloc(10);
console.log(buff1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

const buff2 = Buffer.alloc(10, 1);
console.log(buff2); // <Buffer 01 01 01 01 01 01 01 01 01 01>

const buff3 = Buffer.allocUnsafe(10);
console.log(buff3);