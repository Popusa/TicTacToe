//player factory
const player = (shape,cpu_current_play_position = []) => {
    //shape is interchangeable
    //setters
    const set_shape = (player_shape) => shape = player_shape;
    //this is a cpu-specific var to keep track of its moves
    const set_cpu_current_play_position = (cpu_position) => cpu_current_play_position = cpu_position;
    //getters
    const get_shape = () => shape;
    const get_cpu_current_play_position = () => cpu_current_play_position;
    return {set_shape,set_cpu_current_play_position,get_shape,get_cpu_current_play_position };
  };
//gameboard_controller module handles all data manipulation on the board between player and CPU
const gameboard_controller = (() => {
    //wincon-specific variabes, only used for minimax algorithm and wincon function
    const draw = "Draw";
    const no_winner_yet = "NWY";
    //this one variable controls the board size across all code. this makes board size scalable and adds the opportunity for newer gamemodes later on
    const board_size = 3;
    //retrieved from localstorage, faster than importing/exporting modules from ES6/ES2015
    let active_gamemode;
    //moves that won a player the game for display
    let winning_positions;
    //player turns, x always goes first
    let player_one_turn = true;
    let player_two_turn = false;
    let board = Array.from(Array(board_size), () => new Array(board_size));
    //this function is used in minimax to give the algorithm the static evaluation of each position it tries
    const map_status_to_score = (status) => {
        //numbers are arbitrary, as long as there is non-negative non-zero number, a zero, and a negative number, the goal is achieved
        //-10 means opposing player won, bad
        if (status == player_one.get_shape())
            return -10;
        //10 means you as the player won, very good
        else if (status == player_two.get_shape())
            return 10;
        else
        //0 means a draw, not the best but also not the worst
            return 0;
    }
    const check_wincon_positions = (pos_one,pos_two,pos_three) => {
        //added to make the code look cleaner somewhat more scaleable
        return pos_one == pos_two && pos_two == pos_three && pos_one != ''
    }
    //update the board whenever a player plays a turn
    const update_board = (row,col,shape) => gameboard_controller.board[row][col] = shape;
    const check_win_condition = (shape1,shape2) => {
        //checks if there is a winner, a draw, or game is still ongoing
        //checking rows for a winner
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
        //checking columns for a winner
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
        //checking the diagonals for a winner
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
        //second diagonal
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
                //checking for a draw
        else{
                    let temp_counter = 0;
                    //counter will increment everytime there is a shape
                    for (let i = 0; i < board_size; i++){
                        for (let j = 0; j < board_size; j++){
                            if (board[i][j] == shape1 || board[i][j] == shape2)
                                temp_counter++;
                            else
                                continue;
                        }
                    }
                    //if counter is equal to board size (board.length is 3 in the normal game), there are no available/empty tiles to play, and no winner was announced, this is a draw
                    if (temp_counter == board.length * board.length)
                        return draw;
                    else
                        return no_winner_yet;
                }
        }
    //this function will generate a board on call, useful for resetting the board after a round or when the game first starts
    const generate_new_board = () => {
        for (let i = 0; i < board_size; i++){
            for (let j = 0; j < board_size; j++){
                board[i][j] = '';
            }
        }
    }
    //this function is used in normal and hard difficulties to get a random move
    const get_random_move = () => {
        //get row and col values
        let row = Math.floor(Math.random() * board_size);
        let col = Math.floor(Math.random() * board_size);
        //check the position that the row and col values correspond to are available, if it isn't ,get a new one
        while (board[row][col] == player_one.get_shape() || board[row][col] == player_two.get_shape()){
            row = Math.floor(Math.random() * board_size);
            col = Math.floor(Math.random() * board_size);
        }
        return [row,col];
    }
    const generate_normal_cpu_move = () => {
        //normal mode is just the cpu making random moves
        let random_move = get_random_move();
        return random_move;    
    }
    //this function was added to make the code look cleaner
    const check_hard_winning_move = (pos_one,pos_two,pos_three,shape1,shape2) => {
        return pos_one == shape2 && pos_one == pos_two && pos_three != shape1;
    }
    const generate_hard_cpu_move = () => {
        //hard mode is not very hard, but it is the cpu trying to make connections with the moves it already made randomly and trying to win by playing in the position that would make it win
        //checks for a wincon by looking at the moves it already made
        //ROWS
        //checking the first row for two positions that it played on the same row, if it did, play the third one
        for (let i = 0; i < board_size; i++)
            if (check_hard_winning_move(board[i][0],board[i][1],board[i][2],player_one.get_shape(),player_two.get_shape()))
                return [i,2];
        //checking the second row for two positions that it played on the same row, if it did, play the third one
        for (let i = 0; i < board_size; i++)
            if (check_hard_winning_move(board[i][0],board[i][2],board[i][1],player_one.get_shape(),player_two.get_shape()))
                return [i,1];
        //checking the third row for two positions that it played on the same row, if it did, play the third one
        for (let i = 0; i < board_size; i++)
            if (check_hard_winning_move(board[i][1],board[i][2],board[i][0],player_one.get_shape(),player_two.get_shape()))
                return [i,0];
        //COLUMNS
        //checking the first column for two positions that it played on the same row, if it did, play the third one
        for (let i = 0; i < board_size; i++)
            if (check_hard_winning_move(board[0][i],board[1][i],board[2][i],player_one.get_shape(),player_two.get_shape()))
                return [2,i];
        //checking the second column for two positions that it played on the same row, if it did, play the third one
        for (let i = 0; i < board_size; i++)
            if (check_hard_winning_move(board[0][i],board[2][i],board[1][i],player_one.get_shape(),player_two.get_shape()))
                return [1,i];
        //checking the third column for two positions that it played on the same row, if it did, play the third one
        for (let i = 0; i < board_size; i++)
            if (check_hard_winning_move(board[1][i],board[2][i],board[0][i],player_one.get_shape(),player_two.get_shape()))
                return [0,i];
        //checking the diagonals for two positions played on the same diagonal, if it did, play the third one
        //this is done with if else blocks because implementation with loops is hard to implement
        if (check_hard_winning_move(board[1][1],board[2][2],board[0][0],player_one.get_shape(),player_two.get_shape()))
            return [0,0];
        else if (check_hard_winning_move(board[0][0],board[2][2],board[1][1],player_one.get_shape(),player_two.get_shape()))
            return [1,1];
        else if (check_hard_winning_move(board[0][0],board[1][1],board[2][2],player_one.get_shape(),player_two.get_shape()))
            return [2,2];
        if (check_hard_winning_move(board[1][1],board[2][0],board[0][2],player_one.get_shape(),player_two.get_shape()))
            return [0,2];
        else if (check_hard_winning_move(board[0][2],board[2][0],board[1][1],player_one.get_shape(),player_two.get_shape()))
            return [1,1];
        else if (check_hard_winning_move(board[0][2],board[1][1],board[2][0],player_one.get_shape(),player_two.get_shape()))
            return [2,0];
        else {
            //if after all checks for rows, columns, and diagonals nothing is returned, or this is the first two moves it plays, then just make a random move
            let move = get_random_move();
            return move;
        }
    }
    //this function returns the static evaluation for each position the player, and the cpu make
    function minimax(board,maximizing_player) {
        //first, wincon is calculated when the "test" move is played
        let score = check_win_condition(player_one.get_shape(), player_two.get_shape());
        if (score != no_winner_yet)
        //this move made the game status change from NWY (no_winner_yet) to a state that ended the game, get the evaluation for this move from the cpu's perspective
            return map_status_to_score(score);
        //the maximizing player is the cpu in this case
        if (maximizing_player) {
            //make the score the lowest possible value at first, so that any game ending position changes it and moves the board moves forward
            let best_score = -Infinity;
            for (let i = 0; i < board_size; i++) {
                for (let j = 0; j < board_size; j++) {
                    //is the position empty?
                    if (board[i][j] == '') {
                        //play in that position as me (cpu)
                        board[i][j] = player_two.get_shape();
                        //call the function again but this time,let's look at the player from the cpu's perspective
                        let score = minimax(board, false);
                        //after evaluation of both cpu and player moves with this position, remove this piece and return the maximum between the evaluation and the best score
                        board[i][j] = '';
                        best_score = Math.max(score, best_score);
                        //try the next position on the board and keep going until all board states are covered and then return the absolute "best" score in terms of the cpu 
                    }
                }
            }
            return best_score;
        }
        else {
            //the minimizing player is the player in this case
            let best_score = Infinity;
            for (let i = 0; i < board_size; i++) {
                for (let j = 0; j < board_size; j++) {
                    //is the position empty?
                    if (board[i][j] == '') {
                        //play in that position as them(player)
                        board[i][j] = player_one.get_shape();
                        //call the function again, but let's go back to the maximizing player (cpu)
                        let score = minimax(board, true);
                        //after evaluation of the cpu and player moves with this position, remove this piece and return the minimum between the evaluation and the best score
                        board[i][j] = '';
                        best_score = Math.min(score, best_score);
                        //try the next position on the board and keep going until all board states are covered and then return the absolute "worst" score in terms of the player
                    }
                }
            }
            return best_score;
        }
      }
    //this function generates the unbeatable cpu move by calling minimax with the state of the board slightly modified
    const generate_unbeatable_cpu_move = () => {
        // AI to make its turn
        let best_score = -Infinity;
        let best_move;
        for (let i = 0; i < board_size; i++) {
            for (let j = 0; j < board_size; j++) {
                //is the position empty?
                if (board[i][j] == '') {
                    //play in that position as me (cpu)
                    board[i][j] = player_two.get_shape();
                    //call minimax and let the algorithm evaluate all possible positions for the board right from this state
                    let score = minimax(board, false);
                    //after evaluation of the cpu and player moves with this position, remove this piece and let's compare the scores                   
                    board[i][j] = '';
                    //if the score that makes me (cpu) get a score better than what I currently have, lets make this the best score and the position I just played the best move
                    if (score > best_score) {
                        best_score = score;
                        best_move = [i, j];
                    }
                }
            }
        }
        //after evaluation of all possible states on the current board, let's play the best move
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
    //changes turn from one player to another
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
    return{draw,no_winner_yet,winning_positions,board,board_size,player_one_turn,player_two_turn,
        map_status_to_score,check_wincon_positions,update_board,check_win_condition,generate_new_board,
        get_random_move,generate_normal_cpu_move,check_hard_winning_move,generate_hard_cpu_move,minimax,generate_unbeatable_cpu_move,check_turn,change_turn};
})(); //IIFE
//game display module handles the display and translation of all gameboard_controller's moving parts
const game_display = (() => {
    //since module handles translation between [rol-col] styled positions into numpad styled positions, I needed a map to help me figure out how to do it
    // 1 2 3 
    // 4 5 6
    // 7 8 9
    //   |
    //   V
    // 00 01 02
    // 10 11 12
    // 20 21 22 
    //holds all buttons
    let all_tiles = [];
    //gamemode, and any wincon changes are displayed here
    let header_para;
    //resets the game
    let reset_button;
    //lets the user change gamemodes
    let go_back_button;
    //retrieved from the dom
    const close_change_name_one_form_button = document.querySelector('#close_change_name_one_form_button');
    const close_change_name_two_form_button = document.querySelector('#close_change_name_two_form_button');
    const change_player_one_name_modal = document.querySelector('.change_player_one_modal');
    const change_player_two_name_modal = document.querySelector('.change_player_two_modal'); 
    const change_player_one_name_form = document.querySelector('#change_player_one_form'); 
    const change_player_two_name_form = document.querySelector('#change_player_two_form');  
    //created here with js
    let change_player_one_name_button = document.createElement('button');
    let change_player_two_name_button = document.createElement('button');
    //positions is the most important dom element, it helps display all the buttons and has them appended to it as children nodes
    const positions = document.querySelector(".positions");
    //this variable holds the positions made on the display by translating them from numpad format to row-col format the controller understands
    let tile_board_position;
    //checks wincon after every move, responsible for halting the game from the display's perspective
    let game_decision = gameboard_controller.no_winner_yet;
    //this function works by taking the position played on the display and operating on it until we get its row-col format
    const translate_positions_to_rowcol = (position) =>{
    //for debugging any errors if a wrong value was passed into it
        if (isNaN(position))
            return NaN;
        let row,col;
        //checks if the position is in the first row
        if (position <= gameboard_controller.board_size){
            //if it is, row will always be zero (first row) and the column will never be a value higher than 3, so we subtract one so that it becomes either 0, 1, or 2 (the index of the column)
            row = 0;
            col = position - 1;
        }
        //checks if the position is in the second row
        else if (position <= gameboard_controller.board_size * 2){
            //if it is,row will always be one (second row), and the column will never be a value higher than 6, so we subtract 4 so that it becomes either 0,1,2 (the index of the column)
            row = 1;
            col = position - 4;
        }
        //if the if-else block reaches here, it is the third row
        else{
            //third row means the row index is 2, and the column will never be a value higher than 9, so we subract 7 so that it becomes either 0,1,2 (the index of the column)
            row = 2;
            col = position - 7;
        }
            return [row,col];
        }
    //this function works by taking the position played on the on the board and operating on it until we get its numpad format so that the display can read it correctly
    const translate_positions_to_tile = (row,col) =>{
    //for debugging any errors if wrong values were passed into it
        if (isNaN(row) || isNaN(col))
            return NaN;
        let tile_position;
        //checking if the position is in the first row
        if (row == 0)
            //if it is, we can add the row and the column together + 1 to get the position because row is 0 and the column will be the position that was played but missing a 1 as it is in index form 
            tile_position = row + col + 1;
        //checking if the position is in the second row
        else if (row == 1)
            //if it is, we can add the row and the column together + the board length-
            //to get the position because row is 1 and the column will be the position that was played but missing the board size as it is in index form
            tile_position = row + col + gameboard_controller.board_size;
        //if the if-else block reaches here, it is the third row
        else
            //here, we can do the reverse of what we did in the translating to row-col format function by getting the 6 (maximum value for a position) and adding it to the row and column indices
            //however, the value will be higher than the correct value by one, so we need to subtract that
            tile_position = row + col + (gameboard_controller.board_size * 2) - 1;
        return tile_position;
        }
    //function is responsible for generating the buttons,header_para, the board, the go back button, the change player names buttons, appending everything to either the window or the positions div,
    //and then adding all their respective event listeners
    const generate_display = () => {
        //this function retrieves the active gamemode value, or sets its default to 0 if the player managed to get to this page without choosing a gamemode first
        //(should be impossible, but bugs may arise out of nowhere)
        get_localstorage_data();
        //generate new board
        gameboard_controller.generate_new_board(gameboard_controller.board_size);
        //generate buttons and append them to positions div
        //add them to all_tiles, too
        for (let i = 0; i < gameboard_controller.board_size * gameboard_controller.board_size; i++){
             const btn = document.createElement("button");
             btn.classList.add("btn");
             btn.innerText = "";
             positions.appendChild(btn);
             all_tiles.push(btn);
        }
        //generate header_para, reset, go back, and change player names buttons
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
            //depending on gamemode
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
        //append everything
        document.body.appendChild(header_para);
        document.body.appendChild(reset_button);
        document.body.appendChild(change_player_one_name_button);
        document.body.appendChild(change_player_two_name_button);
        document.body.appendChild(go_back_button);
        //handle every button
        handle_events();
        handle_other_events();
    }
    //this function updates tiles based on player/cpu input
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
    //this function retrives cpu move from controller
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
        return cpu_move;
    }
    //this function handles the cpu playing its move and displaying it
    const play_cpu_move = (cpu_shape) => {
        let temp_position_holder = get_cpu_move();
        gameboard_controller.update_board(temp_position_holder[0],temp_position_holder[1],cpu_shape);
        let tile_display_position = translate_positions_to_tile(temp_position_holder[0],temp_position_holder[1]);
        update_tile(all_tiles[tile_display_position - 1],cpu_shape);
    }
    //this function gets the winning_positions when a player/cpu wins and displays it 
    const get_winning_positions_display = (winning_positions) => {
        let tile_list = [];
        let row;
        let col;
        for (let i = 0; i < gameboard_controller.board_size; i++){
            let temp = winning_positions[i];
            row = temp[0];
            col = temp[1];
            //positions have to be translated to numpad format after they are retrieved from controller in row-col format
            tile_list.push(translate_positions_to_tile(row,col));
        }
        return tile_list;
    }
    //this function displays the winning positions retrieved from controller and translated by display
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
    //handles all tiles events, change name button events, and go back button event
    const handle_events = () => {
        if ( window.history.replaceState ) 
            window.history.replaceState( null, null, window.location.href );
        all_tiles.forEach(tile => tile.addEventListener('click',function(){
            //check for invalid move
                if (tile.innerText == player_one.get_shape() || tile.innerText == player_two.get_shape() || game_decision != gameboard_controller.no_winner_yet)
                    return;
                else{
                    //player move handling
                    tile_board_position = translate_positions_to_rowcol(Number(all_tiles.indexOf(tile) + 1));
                    let current_turn = gameboard_controller.check_turn();
                    //before anything is done, a check is done to make sure player is playing against another player
                    if (gameboard_controller.active_gamemode == 0){
                        gameboard_controller.update_board(tile_board_position[0],tile_board_position[1],current_turn);
                        update_tile(tile,current_turn);
                        gameboard_controller.change_turn();
                    }
                    //player playing against cpu, different actions must be taken
                    else{
                        //player plays their turn
                        gameboard_controller.update_board(tile_board_position[0],tile_board_position[1],player_one.get_shape());
                        update_tile(tile,player_one.get_shape());
                        //wincon check, could end the game
                        game_decision = gameboard_controller.check_win_condition(player_one.get_shape(),player_two.get_shape());
                        if (game_decision == gameboard_controller.no_winner_yet){
                            //cpu plays its turn
                            gameboard_controller.change_turn();
                            current_turn = gameboard_controller.check_turn();
                            play_cpu_move(player_two.get_shape());
                            //change turn back to player
                            gameboard_controller.change_turn();
                            current_turn = gameboard_controller.check_turn();
                        }
                    }
                    //wincon check, player move or cpu move could end the game
                    game_decision = gameboard_controller.check_win_condition(player_one.get_shape(),player_two.get_shape());
                    if (game_decision == gameboard_controller.no_winner_yet)
                        //NWY
                        return;
                    else{
                        //game decision, either a player or cpu won, or draw
                        console.log(game_decision);
                        if (game_decision == gameboard_controller.draw){
                            //draw
                            header_para.innerText = gameboard_controller.draw;
                        }
                        else{
                            //get all winning_positions from controller
                            let winning_position_tiles = get_winning_positions_display(gameboard_controller.winning_positions);
                            //now display them (translation is done in this function too)
                            display_winning_positions(winning_position_tiles);
                            //update header_para
                            header_para.innerText = game_decision + " is the winner";
                    }
                }
            }
        }));
        //all these handle the player name button events along with their respective modals
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
    //this function handles events of reset button, and change player names form submission
    const handle_other_events = () => {
        reset_button.addEventListener("click",function(){
            //resets controller and display used vars
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
            //start handling events for those newly generated buttons again
            handle_events();
    });
    //name change submission
    change_player_one_name_form && change_player_one_name_form.addEventListener('submit',function(e){
        e.preventDefault();
        if (change_player_one_name_form.elements[0].value == "")
            change_player_one_name_button.innerText = "Player One";
        else
            change_player_one_name_button.innerText = change_player_one_name_form.elements[0].value;
        //this data is persistent becuase of localStorage
        localStorage.setItem("player_one_name",JSON.stringify(change_player_one_name_button.innerText));
        close_form();
    });
    change_player_two_name_form && change_player_two_name_form.addEventListener('submit',function(e){
        e.preventDefault();
        if (change_player_two_name_form.elements[0].value == "")
            change_player_two_name_button.innerText = "Player Two";
        else
            change_player_two_name_button.innerText = change_player_two_name_form.elements[0].value;
        //this data is persistent becuase of localStorage
        localStorage.setItem("player_two_name",JSON.stringify(change_player_two_name_button.innerText));
        close_form();
    });
    }
    //this function closes the currently opened form
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
    //this function retrieves stored gamemode and names
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
        translate_positions_to_rowcol,translate_positions_to_tile,generate_display,update_tile,
        get_cpu_move,play_cpu_move,get_winning_positions_display,display_winning_positions,handle_other_events,handle_events,close_form,get_localstorage_data};
})();
//make two players
const player_one =  player('x');
const player_two =  player('o');
//generate everything
game_display.generate_display();
//enjoy the game!