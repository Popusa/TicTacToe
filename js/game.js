const player = (shape,wins = 0,loses = 0,draws = 0,cpu_current_play_position = []) => {
    const set_shape = (player_shape) => shape = player_shape;
    const set_wins = (player_wins) => wins = player_wins;
    const set_loses = (player_loses) => loses = player_loses;
    const set_draws = (player_draws) => draws = player_draws;
    const set_cpu_current_play_position = (cpu_position) => cpu_current_play_position = cpu_position;
    const get_shape = () => shape;
    const get_wins = () => wins;
    const get_loses = () => loses;
    const get_draws = () => draws;
    const get_cpu_current_play_position = () => cpu_current_play_position;
    return {set_shape,set_wins,set_loses,set_draws,set_cpu_current_play_position,get_shape,get_wins,get_loses,get_draws,get_cpu_current_play_position };
  };
const gameboard_controller = (() => {
    const draw = "Draw";
    const no_winner_yet = "NWY";
    const board_size = 3;
    let active_gamemode;
    let winning_positions;
    let player_one_turn = true;
    let player_two_turn = false;
    let board = Array.from(Array(board_size), () => new Array(board_size));
    const map_status_to_score = (status) => {
        if (status == player_one.get_shape())
            return -10;
        else if (status == player_two.get_shape())
            return 10;
        else
            return 0;
    }
    const check_wincon_positions = (pos_one,pos_two,pos_three) => {
        return pos_one == pos_two && pos_two == pos_three && pos_one != ''
    }
    const get_board = () => board;
    const update_board = (row,col,shape) => gameboard_controller.board[row][col] = shape;
    const check_win_condition = (shape1,shape2) => {
        //ROWS
        for (let i = 0; i < board_size; i++){
            if (check_wincon_positions(board[i][0],board[i][1],board[i][2]))
                if (board[i][0] == shape1){
                    gameboard_controller.winning_positions = [[i,0],[i,1],[i,2]];
                    return shape1;
                }
                else{
                    gameboard_controller.winning_positions = [[i,0],[i,1],[i,2]];
                    return shape2;
                 }
        }
        //COLUMNS
        for (let i = 0; i < board_size; i++){
            if (check_wincon_positions(board[0][i],board[1][i],board[2][i]))
                if (board[0][i] == shape1){
                    gameboard_controller.winning_positions = [[0,i],[1,i],[2,i]];
                    return shape1;
                }
                else{
                    gameboard_controller.winning_positions = [[0,i],[1,i],[2,i]];
                    return shape2;
                }
        }
        //DIAGONALS
        if (check_wincon_positions(board[0][0],board[1][1],board[2][2])){
                    if (board[0][0] == shape1){
                        gameboard_controller.winning_positions = [[0,0],[1,1],[2,2]];
                        return shape1;
                    }
                    else{
                        gameboard_controller.winning_positions = [[0,0],[1,1],[2,2]];
                        return shape2;
                    }
                }
        else if (check_wincon_positions(board[0][2],board[1][1],board[2][0])){
                    if (board[0][2] == shape1){
                        gameboard_controller.winning_positions = [[0,2],[1,1],[2,0]];
                        return shape1;
                    }
                    else{
                        gameboard_controller.winning_positions = [[0,2],[1,1],[2,0]];
                        return shape2;
                    }
                }
                //DRAW CHECKING
        else{
                    let temp_counter = 0;
                    for (let i = 0; i < board_size; i++){
                        for (let j = 0; j < board_size; j++){
                            if (board[i][j] == shape1 || board[i][j] == shape2)
                                temp_counter++;
                            else
                                continue;
                        }
                    }
                    if (temp_counter == board.length * board.length)
                        return draw;
                    else
                        return no_winner_yet;
                }
        }
    const generate_new_board = () => {
        for (let i = 0; i < board_size; i++){
            for (let j = 0; j < board_size; j++){
                board[i][j] = '';
            }
        }
    }
    const get_random_move = () => {
        let row = Math.floor(Math.random() * board_size);
        let col = Math.floor(Math.random() * board_size);
        while (board[row][col] == player_one.get_shape() || board[row][col] == player_two.get_shape()){
            row = Math.floor(Math.random() * board_size);
            col = Math.floor(Math.random() * board_size);
        }
        return [row,col];
    }
    const generate_normal_cpu_move = () => {
        let random_move = get_random_move();
        return random_move;    
    }
    const check_hard_winning_move = (pos_one,pos_two,pos_three,shape1,shape2) => {
        return pos_one == shape2 && pos_one == pos_two && pos_three != shape1;
    }
    const generate_hard_cpu_move = () => {
        let row,col;
        //ROWS
        if (check_hard_winning_move(board[0][0],board[0][1],board[0][2],player_one.get_shape(),player_two.get_shape()))
            return [0,2];
        else if (check_hard_winning_move(board[0][0],board[0][2],board[0][1],player_one.get_shape(),player_two.get_shape()))
            return [0,1];
        else if (check_hard_winning_move(board[0][1],board[0][2],board[0][0],player_one.get_shape(),player_two.get_shape()))
            return [0,0];
        else if (check_hard_winning_move(board[1][0],board[1][1],board[1][2],player_one.get_shape(),player_two.get_shape()))
            return [1,2];
        else if (check_hard_winning_move(board[1][0],board[1][2],board[1][1],player_one.get_shape(),player_two.get_shape()))
            return [1,1];
        else if (check_hard_winning_move(board[1][1],board[1][2],board[1][0],player_one.get_shape(),player_two.get_shape()))
            return [1,0];
        else if (check_hard_winning_move(board[2][0],board[2][1],board[2][2],player_one.get_shape(),player_two.get_shape()))
            return [2,2];
        else if (check_hard_winning_move(board[2][0],board[2][2],board[2][1],player_one.get_shape(),player_two.get_shape()))
            return [2,1];
        else if (check_hard_winning_move(board[2][1],board[2][2],board[2][0],player_one.get_shape(),player_two.get_shape()))
            return [2,0];
        //COLUMNS
        if (check_hard_winning_move(board[0][0],board[1][0],board[2][0],player_one.get_shape(),player_two.get_shape()))
            return [2,0];
        else if (check_hard_winning_move(board[0][0],board[2][0],board[1][0],player_one.get_shape(),player_two.get_shape()))
            return [1,0];
        else if (check_hard_winning_move(board[1][0],board[2][0],board[0][0],player_one.get_shape(),player_two.get_shape()))
            return [0,0];
        else if (check_hard_winning_move(board[0][1],board[1][1],board[2][1],player_one.get_shape(),player_two.get_shape()))
            return [2,1];
        else if (check_hard_winning_move(board[0][1],board[2][1],board[1][1],player_one.get_shape(),player_two.get_shape()))
            return [1,1];
        else if (check_hard_winning_move(board[1][1],board[2][1],board[0][1],player_one.get_shape(),player_two.get_shape()))
            return [0,1];
        else if (check_hard_winning_move(board[0][2],board[1][2],board[2][2],player_one.get_shape(),player_two.get_shape()))
            return [2,2];
        else if (check_hard_winning_move(board[0][2],board[2][2],board[1][2],player_one.get_shape(),player_two.get_shape()))
            return [1,2];
        else if (check_hard_winning_move(board[1][2],board[2][2],board[0][2],player_one.get_shape(),player_two.get_shape()))
            return [0,2];   
        //DIAGONALS
        if (check_hard_winning_move(board[1][1],board[2][2],board[0][0],player_one.get_shape(),player_two.get_shape()))
            return [0,0];
        else if (check_hard_winning_move(board[0][0],board[2][2],board[1][1],player_one.get_shape(),player_two.get_shape()))
            return [1,1];
        else if (check_hard_winning_move(board[0][0],board[1][1],board[2][2],player_one.get_shape(),player_two.get_shape()))
            return [2,2];
        else if (check_hard_winning_move(board[0][2],board[2][0],board[1][1],player_one.get_shape(),player_two.get_shape()))
            return [1,1];
        else if (check_hard_winning_move(board[0][2],board[1][1],board[2][0],player_one.get_shape(),player_two.get_shape()))
            return [2,0];
        else if (check_hard_winning_move(board[2][0],board[1][1],board[0][2],player_one.get_shape(),player_two.get_shape()))
            return [0,2];
        else{
            let move = get_random_move();
            return move;
        }
    }
    function minimax(board,maximizing_player) {
        let score = check_win_condition(player_one.get_shape(),player_two.get_shape());
        if (score != no_winner_yet) {
          return map_status_to_score(score);
        }
        if (maximizing_player) {
          let best_score = -Infinity;
          for (let i = 0; i < board_size; i++) {
            for (let j = 0; j < board_size; j++) {
              // Is the spot available?
              if (board[i][j] == '') {
                board[i][j] = player_two.get_shape();
                let score = minimax(board,false);
                board[i][j] = '';
                best_score =  Math.max(score, best_score);
              }
            }
          }
          return best_score;
        } 
        else {
          let best_score = Infinity;
          for (let i = 0; i < board_size; i++) {
            for (let j = 0; j < board_size; j++) {
              // Is the spot available?
              if (board[i][j] == '') {
                board[i][j] = player_one.get_shape();
                let score = minimax(board,true);
                board[i][j] = '';
                best_score = Math.min(score, best_score);
              }
            }
          }
          return best_score;
        }
      }
    const generate_unbeatable_cpu_move = () => {
        // AI to make its turn
        let best_score = -Infinity;
        let best_move;
        for (let i = 0; i < board_size; i++) {
            for (let j = 0; j < board_size; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = player_two.get_shape();
                    let score = minimax(board,false);
                    board[i][j] = '';
                    if (score > best_score) {
                        best_score = score;
                        best_move = [i,j];
                    }
                }
            }
        }
        return best_move;
    }
    //turn is checked after each move
    const check_turn = () => {
        if (player_one_turn){
            return player_one.get_shape();
        }
        else{
            return player_two.get_shape();
        }
    }
    const change_turn = () => {
        if (player_one_turn){
            player_one_turn = false;
            player_two_turn = true;
        }
        else{
            player_one_turn = true;
            player_two_turn = false;
        }
    }
    return{draw,no_winner_yet,winning_positions,board,board_size,player_one_turn,player_two_turn,map_status_to_score,check_wincon_positions,get_board,update_board,check_win_condition,generate_new_board,
        get_random_move,generate_normal_cpu_move,check_hard_winning_move,generate_hard_cpu_move,minimax,generate_unbeatable_cpu_move,check_turn,change_turn};
})();
const game_display = (() => {
    // 1 2 3 
    // 4 5 6
    // 7 8 9
    //   |
    //   V
    // 00 01 02
    // 10 11 12
    // 20 21 22 
    let all_tiles = [];
    let header_para;
    let reset_button;
    let go_back_button;
    const close_change_name_one_form_button = document.querySelector('#close_change_name_one_form_button');
    const close_change_name_two_form_button = document.querySelector('#close_change_name_two_form_button');
    const change_player_one_name_modal = document.querySelector('.change_player_one_modal');
    const change_player_two_name_modal = document.querySelector('.change_player_two_modal'); 
    const change_player_one_name_form = document.querySelector('#change_player_one_form'); 
    const change_player_two_name_form = document.querySelector('#change_player_two_form');  
    let change_player_one_name_button = document.createElement('button');
    let change_player_two_name_button = document.createElement('button');
    const positions = document.querySelector(".positions");
    let tile_board_position;
    let game_decision = gameboard_controller.no_winner_yet;
    const translate_positions_to_rowcol = (position) =>{
        if (isNaN(position))
            return NaN;
        let row,col;
        if (position <= gameboard_controller.board_size){
            row = 0;
            col = position - 1;
        }
        else if (position <= gameboard_controller.board_size * 2){
            row = 1;
            col = position - 4;
        }
        else{
            row = 2;
            col = position - 7;
        }
            return [row,col];
        }
    const translate_positions_to_tile = (row,col) =>{
        if (isNaN(row) || isNaN(col))
            return NaN;
        let tile_position;
        if (row == 0)
            tile_position = row + col + 1;
        else if (row == 1)
            tile_position = row + col + gameboard_controller.board_size;
        else
            tile_position = row + col + (gameboard_controller.board_size * 2) - 1;
        return tile_position;
        }
    const get_positions = () => positions;
    const generate_display = () => {
        gameboard_controller.generate_new_board(gameboard_controller.board_size);
        for (let i = 0; i < gameboard_controller.board_size * gameboard_controller.board_size; i++){
             const btn = document.createElement("button");
             btn.classList.add("btn");
             btn.innerText = "";
             positions.appendChild(btn);
             all_tiles.push(btn);
        }
        header_para = document.createElement('p');
        header_para.classList.add("header_para");
        reset_button = document.createElement('button');
        reset_button.classList.add("reset_button");
        reset_button.innerText = "Reset";
        go_back_button = document.createElement('button');
        go_back_button.classList.add('go_back_button');
        go_back_button.innerText = "Go Back";
        change_player_one_name_button.classList.add("change_player_one_name_button");
        change_player_two_name_button.classList.add("change_player_two_name_button");
        switch (gameboard_controller.active_gamemode){
            case 0:
                header_para.innerText = "Player vs Player Mode";
                break;
            case 1:
                header_para.innerText = "Normal CPU Mode";
                break;
            case 2:
                header_para.innerText = "Hard CPU Mode";
                break;
            case 3:
                header_para.innerText = "Unbeatable CPU mode";
                break;           
        }
        document.body.appendChild(header_para);
        document.body.appendChild(reset_button);
        document.body.appendChild(change_player_one_name_button);
        document.body.appendChild(change_player_two_name_button);
        document.body.appendChild(go_back_button);
    }
    const update_tile = (tile,shape) => {
        if (shape == player_one.get_shape()){
            tile.innerText = player_one.get_shape();
            tile.style.color = "#FFFFFF";
            tile.style.backgroundColor = "#000000";
        }
        else{
            tile.innerText = player_two.get_shape();
            tile.style.color = "#000000";
            tile.style.backgroundColor = "#FFFFFF";
        }
    }
    const get_cpu_move = () => {
        let cpu_move;
        switch(gameboard_controller.active_gamemode){
            case 1:
                cpu_move = gameboard_controller.generate_normal_cpu_move();
                break;
            case 2:
                cpu_move = gameboard_controller.generate_hard_cpu_move();
                break;
            case 3:
                cpu_move = gameboard_controller.generate_unbeatable_cpu_move();
                break;
        }
        //console.log(cpu_move);
        return cpu_move;
    }
    const play_cpu_move = (cpu_shape) => {
        let temp_position_holder = get_cpu_move();
        gameboard_controller.update_board(temp_position_holder[0],temp_position_holder[1],cpu_shape);
        let tile_display_position = translate_positions_to_tile(temp_position_holder[0],temp_position_holder[1]);
        update_tile(all_tiles[tile_display_position - 1],cpu_shape);
    }
    const get_winning_positions_display = (winning_positions) => {
        let tile_list = [];
        let row;
        let col;
        for (let i = 0; i < gameboard_controller.board_size; i++){
            let temp = winning_positions[i];
            row = temp[0];
            col = temp[1];
            tile_list.push(translate_positions_to_tile(row,col));
        }
        return tile_list;
    }
    const display_winning_positions = (winning_positions_tile) => {
        //console.log(winning_positions_tile);
        for (let i = 0; i < gameboard_controller.board_size; i++){
            if (game_decision == player_one.get_shape()) {
                all_tiles[winning_positions_tile[i] - 1].style.backgroundColor = "#00FF00";
                all_tiles[winning_positions_tile[i] - 1].style.color = "#000000";
            }
            else {
                all_tiles[winning_positions_tile[i] - 1].style.backgroundColor = "#FF0000";
                all_tiles[winning_positions_tile[i] - 1].style.color = "#FFFFFF";
            }
        }
    }
    const handle_events = () => {
        if ( window.history.replaceState ) 
            window.history.replaceState( null, null, window.location.href );
        all_tiles.forEach(tile => tile.addEventListener('click',function(){
                if (tile.innerText == player_one.get_shape() || tile.innerText == player_two.get_shape() || game_decision != gameboard_controller.no_winner_yet)
                    return;
                else{
                    tile_board_position = translate_positions_to_rowcol(Number(all_tiles.indexOf(tile) + 1));
                    let current_turn = gameboard_controller.check_turn();
                    if (gameboard_controller.active_gamemode == 0){
                        gameboard_controller.update_board(tile_board_position[0],tile_board_position[1],current_turn);
                        update_tile(tile,current_turn);
                        gameboard_controller.change_turn();
                    }
                    else{
                        //player plays their turn
                        gameboard_controller.update_board(tile_board_position[0],tile_board_position[1],player_one.get_shape());
                        update_tile(tile,player_one.get_shape());
                        game_decision = gameboard_controller.check_win_condition(player_one.get_shape(),player_two.get_shape());
                        if (game_decision == gameboard_controller.no_winner_yet){
                            //cpu plays its turn
                            gameboard_controller.change_turn();
                            current_turn = gameboard_controller.check_turn();
                            play_cpu_move(player_two.get_shape());
                            //change turn back to player
                            gameboard_controller.change_turn();
                            current_turn = gameboard_controller.check_turn();
                            //console.log(current_turn + "'s turn");
                        }
                    }
                    game_decision = gameboard_controller.check_win_condition(player_one.get_shape(),player_two.get_shape());
                    if (game_decision == gameboard_controller.no_winner_yet)
                        return;
                    else{
                        console.log(game_decision);
                        if (game_decision == gameboard_controller.draw){
                            header_para.innerText = gameboard_controller.draw;
                        }
                        else{
                            let winning_position_tile = get_winning_positions_display(gameboard_controller.winning_positions);
                            //console.log(winning_position_tile);
                            display_winning_positions(winning_position_tile);
                            header_para.innerText = game_decision + " is the winner";
                    }
                }
            }
        }));
        change_player_one_name_button.addEventListener("click",function(){
            change_player_one_name_modal.style.display = "flex";
            reset_button.style.zIndex = "-1";
            all_tiles.forEach(tile => tile.style.zIndex = "-1");
            change_player_one_name_button.style.zIndex = "-1";
            change_player_two_name_button.style.zIndex = "-1";
            header_para.style.zIndex = "1";
        });
        change_player_two_name_button.addEventListener("click",function(){
            change_player_two_name_modal.style.display = "flex";
            reset_button.style.zIndex = "-1";
            all_tiles.forEach(tile => tile.style.zIndex = "-1");
            change_player_one_name_button.style.zIndex = "-1";
            change_player_two_name_button.style.zIndex = "-1";
            header_para.style.zIndex = "1";
        });
        close_change_name_one_form_button.addEventListener('click',function(){
            change_player_one_name_modal.style.display = "none";
            reset_button.style.zIndex = "1";
            all_tiles.forEach(tile => tile.style.zIndex = "1");
            change_player_one_name_button.style.zIndex = "1";
            change_player_two_name_button.style.zIndex = "1";
        });
        //closing form two didnt work until I made a dedicated button for it
        close_change_name_two_form_button.addEventListener('click',function(){
            change_player_two_name_modal.style.display = "none";
            reset_button.style.zIndex = "1";
            all_tiles.forEach(tile => tile.style.zIndex = "1");
            change_player_one_name_button.style.zIndex = "1";
            change_player_two_name_button.style.zIndex = "1";
        });
        go_back_button.addEventListener("click",function(){
            location.href = 'index.html';
        });
    }
    const handle_other_events = () => {
        reset_button.addEventListener("click",function(){
            gameboard_controller.generate_new_board(gameboard_controller.board_size);
            while (positions.firstChild)
                positions.removeChild(positions.lastChild);
            all_tiles = [];
            for (let i = 0; i < gameboard_controller.board.length * gameboard_controller.board.length; i++){
                const btn = document.createElement("button");
                btn.classList.add("btn");
                btn.innerText = "";
                positions.appendChild(btn);
                all_tiles.push(btn);
            }
            switch (gameboard_controller.active_gamemode){
                case 0:
                    header_para.innerText = "Player vs Player Mode";
                    break;
                case 1:
                    header_para.innerText = "Normal CPU Mode";
                    break;
                case 2:
                    header_para.innerText = "Hard CPU Mode";
                    break;
                case 3:
                    header_para.innerText = "Unbeatable CPU mode";
                    break;           
            }
            game_decision = gameboard_controller.no_winner_yet;
            handle_events();
    });
    change_player_one_name_form && change_player_one_name_form.addEventListener('submit',function(e){
        e.preventDefault();
        if (change_player_one_name_form.elements[0].value == "")
            change_player_one_name_button.innerText = "Player One";
        else
            change_player_one_name_button.innerText = change_player_one_name_form.elements[0].value;
        localStorage.setItem("player_one_name",JSON.stringify(change_player_one_name_button.innerText));
        close_form();
    });
    change_player_two_name_form && change_player_two_name_form.addEventListener('submit',function(e){
        e.preventDefault();
        if (change_player_two_name_form.elements[0].value == "")
            change_player_two_name_button.innerText = "Player Two";
        else
            change_player_two_name_button.innerText = change_player_two_name_form.elements[0].value;
        localStorage.setItem("player_two_name",JSON.stringify(change_player_two_name_button.innerText));
        close_form();
    });
    }
    const close_form = () => {
        if (change_player_one_name_modal.style.display == "flex")
            change_player_one_name_modal.style.display = "none";
        else
            change_player_two_name_modal.style.display = "none";
        reset_button.style.zIndex = "1";
        all_tiles.forEach(tile => tile.style.zIndex = "1");
        change_player_one_name_button.style.zIndex = "1";
        change_player_two_name_button.style.zIndex = "1";
        header_para.style.zIndex = "1";
    }
    const get_localstorage_data = () => {
    if (localStorage.getItem("chosen_gamemode") != null)
        gameboard_controller.active_gamemode = JSON.parse(localStorage.getItem("chosen_gamemode"));
    else
        gameboard_controller.active_gamemode = 0;
        let localstorage_player_one_name;
        let localstorage_player_two_name;
        if (localStorage.getItem("player_one_name") != null)
            localstorage_player_one_name = JSON.parse(localStorage.getItem("player_one_name"));
        else
            localstorage_player_one_name = "Player One"
        if (localStorage.getItem("player_two_name") != null)
            localstorage_player_two_name = JSON.parse(localStorage.getItem("player_two_name"));
        else
            localstorage_player_two_name = "Player Two";
        change_player_one_name_button.innerText = localstorage_player_one_name;
        change_player_two_name_button.innerText = localstorage_player_two_name;
    }
    return{all_tiles,header_para,close_change_name_one_form_button,close_change_name_one_form_button,change_player_one_name_modal,change_player_two_name_modal,
        change_player_one_name_form,change_player_two_name_form,change_player_one_name_button,change_player_two_name_button,positions,tile_board_position,game_decision,
        translate_positions_to_rowcol,translate_positions_to_tile,get_positions,generate_display,update_tile,
        get_cpu_move,play_cpu_move,get_winning_positions_display,display_winning_positions,handle_other_events,handle_events,close_form,get_localstorage_data};
})();
const player_one =  player('x');
const player_two =  player('o');
game_display.get_localstorage_data();
game_display.generate_display();
game_display.handle_events();
game_display.handle_other_events();