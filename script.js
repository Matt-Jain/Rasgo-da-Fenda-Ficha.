let user = "";
let characters = JSON.parse(localStorage.getItem("characters") || "[]");
let currentChar = null;
let points = 200;

const skillsList = [
  "Luta","Armas Brancas","Armas de Fogo","Esquiva",
  "Conhecimento","Percepção","Investigação","Ocultismo","Intuição",
  "Acrobacia","Atletismo","Furtividade","Resistência",
  "Diplomacia","Persuasão","Enganação","Intimidação","Empatia"
];

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function login(){
  user = username.value;
  userNameDisplay.textContent = user;
  updateCount();
  show("menuScreen");
}

function openCreate(){
  points = 200;
  show("createScreen");
}

function goToSkills(){
  currentChar = {
    name: charName.value,
    player: playerName.value,
    vida: 15,
    sanidade: 15,
    incontrole: 0,
    skills: {}
  };

  skills.innerHTML = "";
  skillsList.forEach(s=>{
    currentChar.skills[s]=0;
    skills.innerHTML += `
      <div>${s}: 
      <input type="number" min="0" value="0"
      onchange="updateSkill('${s}',this.value)">
      </div>`;
  });

  show("skillsScreen");
}

function updateSkill(skill,val){
  val = parseInt(val);
  let total = Object.values(currentChar.skills).reduce((a,b)=>a+b,0);
  if(total + val > 200) return;
  currentChar.skills[skill]=val;
  points = 200 - Object.values(currentChar.skills).reduce((a,b)=>a+b,0);
  document.getElementById("points").textContent = points;
}

function finishCharacter(){
  characters.push(currentChar);
  localStorage.setItem("characters",JSON.stringify(characters));
  updateCount();
  show("menuScreen");
}

function openCharacters(){
  characterList.innerHTML="";
  characters.forEach((c,i)=>{
    characterList.innerHTML+=`
      <div>
        <b>${c.name}</b>
        <button onclick="viewChar(${i})">Visualizar</button>
      </div>`;
  });
  show("charactersScreen");
}

function viewChar(i){
  currentChar = characters[i];
  viewName.textContent = currentChar.name;
  vida.textContent = currentChar.vida;
  sanidade.textContent = currentChar.sanidade;
  incontrole.textContent = currentChar.incontrole;
  raceInfo.textContent = currentChar.race || "";
  show("viewScreen");
}

function modStat(stat,val){
  currentChar[stat]+=val;
  viewChar(characters.indexOf(currentChar));
}

function despertar(){
  let roll = Math.floor(Math.random()*100)+1;
  if(roll>=11){
    currentChar.race="AUREADO";
    currentChar.vida+=10;
  } else if(roll>=2){
    currentChar.race="VIGILANTE";
    currentChar.vida+=15;
  } else {
    currentChar.race="NEPHILIM";
    currentChar.vida+=20;
  }
  localStorage.setItem("characters",JSON.stringify(characters));
  viewChar(characters.indexOf(currentChar));
}

function updateCount(){
  charCount.textContent = `(${characters.length})`;
}

function backToMenu(){
  show("menuScreen");
}
