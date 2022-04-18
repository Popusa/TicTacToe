//main menu module
const main_menu = (() => {
    //main menu div
    const main_menu_div = document.querySelector('.main_menu');
    // all element definitions
    let h1_header = document.createElement('h1');
    let made_by;
    let made_by_wrapper = document.createElement('div');
    const pvp_button = document.createElement('button');
    const pvcpu_normal_button = document.createElement('button');
    const pvcpu_hard_button = document.createElement('button');
    const pvcpu_unbeatable_button = document.createElement('button');
    const start_button = document.createElement('button');
    const all_gamemode_buttons = [pvp_button, pvcpu_normal_button, pvcpu_hard_button, pvcpu_unbeatable_button];
    const chosen_gamemode = [false,false,false,false];
    const  create_link = (str,a) => {
        //create anchor
        let anchor = document.createElement('a');
        //create text for link
        let link = document.createTextNode(str);
        //add text to anchor
        anchor.appendChild(link);
        //add url to anchor
        anchor.href = a;
        //add anchor to wrapper div
        made_by_wrapper.appendChild(anchor);
        //add wrapper to main menu
        main_menu_div.appendChild(made_by_wrapper);
    }
    const generate_main_menu_elements = () => {
        //defining classlists and text
        h1_header.innerText = "Tic Tac Toe";
        main_menu_div.appendChild(h1_header);
        //made by wrapper class added to be styled by css
        made_by_wrapper.classList.add("made_by_wrapper");
        //generate the made by link and add it to main menu
        made_by = create_link("Made By Daniel Youssef","https://github.com/Popusa/tic-tac-toe");
        //defining gamemode buttons
        pvp_button.classList.add("pvp_button");
        pvp_button.innerText = "PLAYER VS PLAYER";
        pvcpu_normal_button.classList.add("pvcpu_normal_button");
        pvcpu_normal_button.innerText = "PLAYER VS COMPUTER (NORMAL)";
        pvcpu_hard_button.classList.add("pvcpu_hard_button");
        pvcpu_hard_button.innerText = "PLAYER VS COMPUTER (HARD)";
        pvcpu_unbeatable_button.classList.add("pvcpu_unbeatable_button");
        pvcpu_unbeatable_button.innerText = "PLAYER VS COMPUTER (UNBEATABLE)";
        start_button.classList.add("start_button");
        start_button.innerText = "START";
        //appending all children to main menu div parent
        all_gamemode_buttons.forEach(button => main_menu_div.appendChild(button));
        main_menu_div.appendChild(start_button);
        //function call to handle event listeners for all buttons except start, it has its own seperate event listeners
        handle_main_menu_events();
    }
    const handle_main_menu_events = () => {
        //all gamemode buttons event listener(s)
        all_gamemode_buttons.forEach(button => button.addEventListener('click', function () {
            for (let i = 0; i < all_gamemode_buttons.length; i++) {
                //simply resets all buttons to default color
                if (all_gamemode_buttons[i].style.backgroundColor == "green") {
                    all_gamemode_buttons[i].style.backgroundColor = "beige";
                    all_gamemode_buttons[i].style.color = "black";
                    break;
                }
            }
            // this for each loop removes style from all buttons so the hover effect doesn't stop working when a button is clicked due to conflicts with javascript code and css code
            all_gamemode_buttons.forEach(button => button.removeAttribute("style"));
            //styling the clicked button
            button.style.backgroundColor = "green";
            button.style.color = "white";
            //setting chosen gamemode var to match appropriate gamemode
            set_chosen_gamemode(all_gamemode_buttons.indexOf(button));
            //for testing
            console.log(chosen_gamemode.indexOf(true));
        }));
        start_button.addEventListener('click', function () {
            //error validation
            if (chosen_gamemode.indexOf(true) == -1)
                alert("You must choose a gamemode!");
            else {
                //this value is used to generate the gamemode for game.html file, found this to be easier than importing and exporting modules/functions
                localStorage.setItem('chosen_gamemode', JSON.stringify(chosen_gamemode.indexOf(true)));
                location.href = 'game.html';
            }
        });
    }
    const set_chosen_gamemode = (id) => {
        //button id is already an index, can be represented in an array
        let chosen_gamemode_idx = id;
        switch (chosen_gamemode_idx) {
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
        //resetting other gamemode choices other than the one chosen to prevent conflicts
        reset_unchosen_gamemode_values(chosen_gamemode_idx);
    }
    const reset_unchosen_gamemode_values = (chosen_gamemode_idx) => {
        for (let i = 0; i < chosen_gamemode.length; i++) {
            //the one we want to keep
            if (i == chosen_gamemode_idx)
                continue;
            else
                chosen_gamemode[i] = false;
        }    
    }
    return{create_link,generate_main_menu_elements,handle_main_menu_events,set_chosen_gamemode,reset_unchosen_gamemode_values};
})();
//this functions calls all the other functions as shown above
main_menu.generate_main_menu_elements();