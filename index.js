const pvp_button = document.querySelector("#pvp_button");
const pvcpu_normal_button = document.querySelector("#pvcpu_normal_button");
const pvcpu_hard_button = document.querySelector("#pvcpu_hard_button");
const pvcpu_unbeatable_button = document.querySelector("#pvcpu_unbeatable_button");
const start_button = document.querySelector("#start_button");
const all_buttons = [pvp_button,pvcpu_normal_button,pvcpu_hard_button,pvcpu_unbeatable_button];
const chosen_gamemode = [false,false,false,false];
all_buttons.forEach(button => button.addEventListener('click',function(){
    for (let i = 0; i < all_buttons.length; i++){
        if (all_buttons[i].style.backgroundColor == "green"){
            all_buttons[i].style.backgroundColor = "beige";
            all_buttons[i].style.color = "black";
            break;
        }
     }
    all_buttons.forEach(button => button.removeAttribute("style"));
     button.style.backgroundColor = "green";
     button.style.color = "white";
     console.log(chosen_gamemode.indexOf(true));
}));
function set_chosen_gamemode(id){
    let chosen_gamemode_idx = id;
    switch(chosen_gamemode_idx){
        case 0:
            chosen_gamemode[0] = true;
            break;
        case 1:
            chosen_gamemode[1] = true;
            break;
        case 2:
            chosen_gamemode[2] = true;
            break;
        case 3:
            chosen_gamemode[3] = true;
            break;
    }
    reset_unchosen_gamemode_values(chosen_gamemode_idx);
}
function reset_unchosen_gamemode_values(chosen_gamemode_idx){
    for (let i = 0; i < chosen_gamemode.length; i++){
        if (i == chosen_gamemode_idx)
            continue;
        else
            chosen_gamemode[i] = false;
    }    
}
start_button.addEventListener('click',function(){
    if (chosen_gamemode.indexOf(true) == -1)
        alert("You must choose a gamemode!");
    else{
        location.href = 'game.html';
        localStorage.setItem('chosen_gamemode', JSON.stringify(chosen_gamemode.indexOf(true)));
    }
});