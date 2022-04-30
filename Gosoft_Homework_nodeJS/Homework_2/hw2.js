let text = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let emp = [];

for(let i=0; i<text.length; i++){
    emp += text[i+=1] + " " + text[i-1] + " "
}

    console.log(emp);