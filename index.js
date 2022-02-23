const pvp_button = document.querySelector("#pvp_button");
const pvcpu_normal_button = document.querySelector("#pvcpu_normal_button");
const pvcpu_hard_button = document.querySelector("#pvcpu_hard_button");
const pvcpu_unbeatable_button = document.querySelector("#pvcpu_unbeatable_button");
const start_button = document.querySelector("#start_button");
const all_buttons = [pvp_button,pvcpu_normal_button,pvcpu_hard_button,pvcpu_unbeatable_button];
const chosen_gamemode = [false,false,false,false];
let clicked_button_id;
all_buttons.forEach(button => button.addEventListener('click',function(idx){
    for (let i = 0; i < all_buttons.length; i++){
        if (all_buttons[i].style.backgroundColor == "green"){
            all_buttons[i].style.backgroundColor = "beige";
            all_buttons[i].style.color = "black";
            chosen_gamemode[i] = false;
            break;
        }
     }
    all_buttons.forEach(button => button.removeAttribute("style"));
     button.style.backgroundColor = "green";
     button.style.color = "white";
}));
function get_clicked_button_id(id){
    clicked_button_id = id;
}