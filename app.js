const input = document.querySelector("#input");
let audioBox = document.querySelector('#audio');
const btn = document.querySelector("#btn");

const Url =
  "https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=cfffdced-a72a-4fdb-96ba-92fb38a053da";


const p = document.querySelector("#conatainer");
p.innerHTML = `<h1 class ='text-center'> enter something to search <\h1>`;

btn.addEventListener("click", async (e) => {
  e.preventDefault();
 
  const value = input.value;
  if (value === ""){
    alert("enter some words");
   
  }else{
    
    p.innerHTML = "<h1 class='text-center'> loading .... <\h1>";

  const api = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/sd3/json/${value}?key=cfffdced-a72a-4fdb-96ba-92fb38a053da`
  );
  const data = await api.json();
  
  console.log(data);

 
  if (data.length ==0) {
    p.innerHTML = `<h1 class ='text-center'>enter the valid word <\h1>`;
    
  }else{


    p.innerHTML = "";
    data.forEach((element, index) => {
     var meaning = element.shortdef;
     var type = element.fl;
    //  alert(typeof(meaning));
     if (meaning === undefined && type === undefined) {
        p.innerHTML += `
        <h6><b>do you mean ? : </b>${element}</h6>
       
        <hr>
        
            `
     }else{
        if(data.length !== 0 && data[0].hwi.prs[0].sound !== undefined){
            audioBox.innerHTML = "";
            const soundName = data[0].hwi.prs[0].sound.audio;
            
            if(soundName) {
                renderSound(soundName);
            }
        }
      
        if(type === undefined){
            type ='not found any valid type kindly search for google'
           }
           if(meaning === undefined ){
            meaning='not found any valid type kindly search for google'
           }
            p.innerHTML += `
            <h3><b> meaning: </b>${meaning}</h3>
            <h5> <b>type: </b>${type} </h5>
            <hr>
            
                `;
     }
    
    });

  }
  
}

});
function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=cfffdced-a72a-4fdb-96ba-92fb38a053da`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);

}