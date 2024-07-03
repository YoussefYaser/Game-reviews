import {Game} from './games.js';
import {UserInterface} from './ui.js';
import { GameDetails } from './details.js';


let game= new Game();  
let ui = new UserInterface();
let gd = new GameDetails();
const navLink = document.querySelectorAll('.page .home .navbar-nav .nav-link');
const row = document.querySelector('.games .row');
let gameCard;


//show data on the first load

let cat;

if(localStorage.getItem('cat') == null)
    cat = 'mmorpg';
else{
    const catObj = JSON.parse( localStorage.getItem('cat') );
    cat = catObj.cat;
    ui.activeLink(navLink, navLink[catObj.index]);
}

game.showData( await game.fetchApi(cat));


//----------------------------------------------------------------------------------------------------------------------


// show data when the category clicked

navLink.forEach(function(elem, i){

    elem.addEventListener('click', async function(event){
        ui.activeLink(navLink ,this);
        ui.setLoading(row);
        ui.saveCatToLocalStorage({cat : this.getAttribute('data-genre'), index : i});
        game.showData( await game.fetchApi(this.getAttribute('data-genre')) ); 
    });

});

//------------------------------------------------------------------------------------------------------------------------

// close navbar if you click outside it

document.addEventListener('click', function(event){
    ui.closeNav(event.target);
})

//-------------------------------------------------------------------------------------------------------------------------

// scroll to show the arrow up

window.addEventListener('scroll', function(){
    if(this.scrollY > 300)
        ui.arrowShow(true);
    else
        ui.arrowShow(false);
});

//-------------------------------------------------------------------------------------------------------------------------

// click on arrow up to reset scroll

const arrowUp = document.querySelector('.arrow-up');

arrowUp.addEventListener('click', function(){
    ui.arrowUp();
})

//-------------------------------------------------------------------------------------------------------------------------

// click on game to show details



//-------------------------------------------------------------------------------------------------------------------------