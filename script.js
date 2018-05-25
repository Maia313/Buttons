const decrement = document.getElementById('decrement');
const increment = document.getElementById('increment');
const counterDiv = document.getElementById('counter');
const loader = document.getElementById('loader');

async function incrementCounterValue() { 
    spinLoader();
    const counter = parseInt(counterDiv.innerHTML, 10);

    if(counter < repos.length -1){
        counterDiv.innerHTML =  parseInt(counterDiv.innerHTML, 10) + 1;
        await displayRepoData();
    }
    stopSpinning();
}

async function decrementCounterValue(){
    spinLoader();
    const counter = parseInt(counterDiv.innerHTML, 10);

    if(counter > 1){
        counterDiv.innerHTML =  counter - 1;
        await displayRepoData();
    }
    stopSpinning();
}

const repos = [
    { owner: 'eslint', name: 'eslint' },
    { owner: 'oakwood', name:'front-end -questions' },
    { owner: 'babel', name: 'babel' },
    { owner: 'webpack', name: 'webpack' },
    { owner: 'storybooks', name: 'storybook' },
    { owner: 'facebook', name: 'react' },
    { owner: 'reactjs', name: 'redux' },
    { owner: 'expressjs', name: 'express' },
];

async function fetchData(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

async function displayRepoData(){
    const counter = parseInt(counterDiv.innerHTML, 10);
    
    const repo = repos[counter-1];
    const data = await fetchData(`https://api.github.com/repos/${repo.owner}/${repo.name}`);
    console.log(data);

    if(!data.full_name && !data.description && !data.stargazers_count){
        document.getElementById('title').innerHTML =  'Repo does not exist!'; 
        document.getElementById('description').innerHTML = ' ';
        document.getElementById('stars').innerHTML = ' ';
    } else {
        document.getElementById('title').innerHTML = data.full_name; 
        document.getElementById('description').innerHTML = data.description;
        document.getElementById('stars').innerHTML = 'Stargazers: '+ data.stargazers_count;
    }
}

function spinLoader(){
    loader.classList.remove("hidden");
}

function stopSpinning(){
    loader.classList.add("hidden");
}

decrement.addEventListener('click', decrementCounterValue);
increment.addEventListener('click', incrementCounterValue);
