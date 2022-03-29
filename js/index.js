const main_menu = (() => {
    let h1_header = document.createElement('h1');
    const pvp_button = document.createElement('button');
    const pvcpu_normal_button = document.createElement('button');
    const pvcpu_hard_button = document.createElement('button');
    const pvcpu_unbeatable_button = document.createElement('button');
    const start_button = document.createElement('button');
    const all_gamemode_buttons = [pvp_button, pvcpu_normal_button, pvcpu_hard_button, pvcpu_unbeatable_button];
    const chosen_gamemode = [false,false,false,false];
    const generate_main_menu_elements = () => {
        const main_menu_div = document.querySelector('.main_menu');
        h1_header.innerText = "Tic Tac Toe";
        main_menu_div.appendChild(h1_header);
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
        all_gamemode_buttons.forEach(button => main_menu_div.appendChild(button));
        main_menu_div.appendChild(start_button);
        handle_main_menu_events();
    }
    const handle_main_menu_events = () => {
        all_gamemode_buttons.forEach(button => button.addEventListener('click', function () {
            for (let i = 0; i < all_gamemode_buttons.length; i++) {
                if (all_gamemode_buttons[i].style.backgroundColor == "green") {
                    all_gamemode_buttons[i].style.backgroundColor = "beige";
                    all_gamemode_buttons[i].style.color = "black";
                    break;
                }
            }
            all_gamemode_buttons.forEach(button => button.removeAttribute("style"));
            button.style.backgroundColor = "green";
            button.style.color = "white";
            set_chosen_gamemode(all_gamemode_buttons.indexOf(button));
            console.log(chosen_gamemode.indexOf(true));
        }));
        start_button.addEventListener('click', function () {
            if (chosen_gamemode.indexOf(true) == -1)
                alert("You must choose a gamemode!");
            else {
                localStorage.setItem('chosen_gamemode', JSON.stringify(chosen_gamemode.indexOf(true)));
                location.href = 'game.html';
            }
        });
    }
    const set_chosen_gamemode = (id) => {
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
        reset_unchosen_gamemode_values(chosen_gamemode_idx);
    }
    const reset_unchosen_gamemode_values = (chosen_gamemode_idx) => {
        for (let i = 0; i < chosen_gamemode.length; i++) {
            if (i == chosen_gamemode_idx)
                continue;
            else
                chosen_gamemode[i] = false;
        }    
    }
    return{generate_main_menu_elements,handle_main_menu_events,set_chosen_gamemode,reset_unchosen_gamemode_values};
})();
main_menu.generate_main_menu_elements();