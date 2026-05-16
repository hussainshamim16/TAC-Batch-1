console.log('hello');

// Return Function Kya Hota Hai?

/*Return function ka matlab hai: Ek function doosra function return (wapas) karta hai.

Simple words mein: Aap ek function call karte ho, aur woh function aapko ek naya function de deta hai - value nahi, balke poori ki poori function!*/

// ye simple aike number return ka seen hey 

function clientnumber(){
    return 923160578365
}
let amjadbhaai = clientnumber()
console.log(amjadbhaai)

// if you reurn function
function dawatperjaaao(){
    return function(){
        console.log('khaana in process')
    }
}
let khanakhaya = dawatperjaaao()
khanakhaya()


// Lexical Scoping
/*Lexical Scoping ka matlab hai ke kisi variable ki "pohanch" (accessibility) is baat se tay hoti hai ke wo code mein kis jagah likha gaya hai.

Isko asaan samajhne ke liye Parent-Child ka rule yaad rakhein:

Inner Function (Beti): Apne bahar wale outer function (Maa) ke variables (peysye) ko asani se istemal kar sakti hai.

Outer Function (Maa): Apne andar wale inner function ke variables(peysye) ko istemal nahi kar sakti.

Aasan Lafzon Mein: JavaScript code ko run karne se pehle hi (likhte waqt hi) yeh tay kar leta hai ke kaun sa function kis variable ko dekh sakta hai aur kise nahi.*/

function outer() {
    let maa_Ka_Paisa = "💸";

    function inner() {
        let bet_ka_paisa = '900'
        // Yeh bilkul sahi hai, inner function bahar wale variable ko dekh sakta hai
        console.log(maa_Ka_Paisa); 
    }

    console.log(bet_ka_paisa)
}
outer()

// Lexical Environment Kya Hai?
/*
Lexical Environment ek internal data structure hai jo JavaScript engine use karta hai variables aur functions ko track karne ke liye - yani "kaunsa variable kahan accessible hai" yeh decide karne ke liye.

Har Lexical Environment mein 2 parts hote hain:
Environment Record - Variables aur functions ki list (jaise dictionary)
Outer Reference - Outer environment ka reference (parent scope)


Simple words mein: Yeh ek record book hai jisme likha hota hai ke "is function ke andar kaunse variables hain aur unke values kya hain".
*/

let globalVar = "Main global hun";

function outerFunction() {
    let outerVar = "Main outer hun";
    
    function innerFunction() {
        let innerVar = "Main inner hun";
        console.log(innerVar);   // ✅
        console.log(outerVar);   // ✅
        console.log(globalVar);  // ✅
    }
    
    innerFunction();
}

outerFunction();

/*Lexical Environment Kaise Kaam Karta Hai?
Jab aap variable access karte ho, JavaScript yeh karta hai:

Pehle current environment mein dhundhta hai

Agar nahi mila to outer environment mein dhundhta hai

Agar nahi mila to outer's outer mein dhundhta hai

Jab tak global nahi mil jaata

Isko Scope Chain kehte hain.*/



//  Closures
// Closure ek function ka woh special power hai, jahan ek inner function apne outer function ke variables ko tab bhi yaad rakhta hai jab outer function khatam ho chuka ho.

// Yani closure ek function + uss function ke surrounding state (lexical environment) ka combination hai.

function counter() {
    let count = 0; // Ye variable closure mein "band" ho jayega

    return function () {
        count++; // Inner function outer variable ko access kar raha
        console.log(count);
    }
}

let meraCounter = counter(); // counter() khatam ho gaya...
meraCounter(); // Output: 1 (lekin count abhi bhi memory mein hai!)
meraCounter(); // Output: 2
meraCounter(); // Output: 3


// Real Life Example (Practical Use):
function makeGreeting(language) {
    return function (name) {
        if (language === "urdu") {
            console.log(`Assalam-o-Alaikum ${name}`);
        } else if (language === "english") {
            console.log(`Hello ${name}`);
        }
    }
}


/*Sawal: Closure kyun use karein?
Jawab: Data privacy (encapsulation) ke liye, factory functions banane ke liye, event handlers mein, aur async operations mein state preserve karne ke liye.*/


let urduGreeting = makeGreeting("urdu");
let englishGreeting = makeGreeting("english");

urduGreeting("Ali");    // Assalam-o-Alaikum Ali
englishGreeting("Ali"); // Hello Ali



// hoisting
/*JavaScript Hoisting ek aisa behavior hai jisme JavaScript engine code ko execute (run) karne se pehle saare Variable aur Function declarations ko unke scope ke sab se top (oopar) le jata hai.
Aasan alfaaz mein, iska matlab yeh hai ki aap kisi variable ya function ko banane (declare karne) se pehle hi use kar sakte hain, aur JavaScript error nahi deta.
Chalein isko misalon se aasan samajhte hain.

1. Function Hoisting (Sab se behtareen kaam karti hai)
Agar aap ek normal function banate hain, toh aap use declare karne se pehle bhi call kar sakte hain.


// Function banane se pehle hi call kar diya
sayHello(); 

function sayHello() {
  console.log("Salam! Kia haal hen?");
}


JavaScript Hoisting ek aisa behavior hai jisme JavaScript engine code ko execute (run) karne se pehle saare Variable aur Function declarations ko unke scope ke sab se top (oopar) le jata hai.

Aasan alfaaz mein, iska matlab yeh hai ki aap kisi variable ya function ko banane (declare karne) se pehle hi use kar sakte hain, aur JavaScript error nahi deta.

Chalein isko misalon se aasan samajhte hain.

1. Function Hoisting (Sab se behtareen kaam karti hai)
Agar aap ek normal function banate hain, toh aap use declare karne se pehle bhi call kar sakte hain.

Example:
JavaScript
// Function banane se pehle hi call kar diya
sayHello(); 

function sayHello() {
  console.log("Salam! Kia haal hen?");
}
Background mein kia hota hai?
JavaScript engine back-end par aapke code ko dekhta hai aur function sayHello() ko utha kar file ke sab se oopar rakh deta hai, isliye yeh bina kisi error ke chal jata hai.

2. var ke sath Hoisting (Undefined ka chakkar)
Agar aap var ke zariye variable banate hain, toh variable oopar toh chala jata hai (hoist ho jata hai), lekin uski value oopar nahi jati. Sirf variable ka naam oopar jata hai aur uski default value undefined ho jati hai.


console.log(username); // Output: undefined (Error nahi aayega!)
var username = "Hussain";
console.log(username); // Output: Hussain


let aur const ke sath Hoisting (Temporal Dead Zone)
Modern JavaScript (ES6) mein let aur const bhi hoist hote hain, lekin yeh var ki tarah free nahi hote. Jab tak inko code mein unki line par value na mil jaye, yeh ek khufia jail mein hote hain jise Temporal Dead Zone (TDZ) kehte hain.
Agar aap inhein declare karne se pehle access karenge, toh direct ReferenceError aayega.


console.log(age); // ReferenceError: Cannot access 'age' before initialization
let age = 20;

*/




// event loop



//
