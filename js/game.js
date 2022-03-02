const player = (player_name,shape,wins = 0,loses = 0,draws = 0) => {
    const get_name = () => player_name;
    const get_shape = () => shape;
    const get_wins = () => wins;
    const get_loses = () => loses;
    const get_draws = () => draws;
    return {get_name,get_shape,get_wins,get_loses,get_draws };
  };
const gameboard_controller = (() => {
    const draw = "Draw";
    const no_winner_yet = "NWY";
    let active_gamemode;
    let player_one_turn = true;
    let player_two_turn = false;
    let board = [
    ['','',''],
    ['','',''],
    ['','',''],
    ];
    const get_board = () => board;
    const update_board = (row,col,shape) => gameboard_controller.board[row][col] = shape;
    const check_win_condition = (shape1,shape2) => {
        for (let i = 0; i < 3; i++){
            if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != '')
                if (board[i][0] == shape1)
                    return shape1;
                else
                    return shape2;
                 }
        for (let i = 0; i < 3; i++){
            if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != '')
                if (board[0][i] == shape1)
                    return shape1;
                else
                    return shape2;
                 }
                if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
                    if (board[0][0] == shape1)
                        return shape1;
                    else
                        return shape2;
                }
                else if (board[0][2] == board[1][1] && board[1][1] == board[2][0]  && board[0][2] != ''){
                    if (board[0][2] == shape1)
                        return shape1;
                    else
                        return shape2;
                }
                else{
                    let temp_counter = 0;
                    for (let i = 0; i < 3; i++){
                        for (let j = 0; j < 3; j++){
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
    const reset_board = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                board[i][j] = '';
            }
        }
    }
    //turn is checked after each move
    const check_turn = () => {
        if (player_one_turn == true){
            player_one_turn = false;
            player_two_turn = true;
            return player_one.get_shape();
        }
        else{
            player_two_turn = false;
            player_one_turn = true;
            return player_two.get_shape();
        }
    }
    return{draw,no_winner_yet,board,player_one_turn,player_two_turn,get_board,update_board,check_win_condition,reset_board,check_turn};
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
    const all_tiles = [];
    const positions = document.querySelector(".positions");
    let tile_board_position;
    let game_decision = gameboard_controller.no_winner_yet;
    const translate_positions = (position) =>{
        if (isNaN(position))
            return NaN;
        let row,col;
        if (position <= 3){
            row = 0;
            col = position - 1;
        }
        else if (position <= 6){
            row = 1;
            col = position - 4;
        }
        else{
            row = 2;
            col = position - 7;
        }
            return [row,col];
        }
    const get_positions = () => positions;
    const generate_display = (num_of_btns) => {
     for (let i = 0; i < num_of_btns; i++){
             const btn = document.createElement("button");
             btn.classList.add("btn");
             btn.innerText = i + 1;
             positions.appendChild(btn);
             all_tiles.push(btn);
        }
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
    const handle_events = () => {
        all_tiles.forEach(tile =>
            tile.addEventListener('click',function(){
                if (tile.innerText == player_one.get_shape() || tile.innerText == player_two.get_shape() || game_decision != gameboard_controller.no_winner_yet)
                    return;
                else{
                    tile_board_position = translate_positions(Number(tile.innerText));
                    let current_turn = gameboard_controller.check_turn();
                    gameboard_controller.update_board(tile_board_position[0],tile_board_position[1],current_turn);
                    update_tile(tile,current_turn);
                    game_decision = gameboard_controller.check_win_condition(player_one.get_shape(),player_two.get_shape());
                    if (game_decision == gameboard_controller.no_winner_yet){
                        return;
                    }
                    else{
                        console.log(game_decision);
                    }
                }
            }));
    }
    return{all_tiles,positions,tile_board_position,game_decision,translate_positions,get_positions,generate_display,update_tile,handle_events};
})();
try{
    gameboard_controller.active_gamemode = JSON.parse(localStorage.getItem("chosen_gamemode"));
}
catch(error){
        console.log(error);
        gameboard_controller.active_gamemode = 1;
}
// console.log(gameboard_controller.active_gamemode);
// game_display.positions[0].innerText = "3";
// game_display.positions[0].innerText = "test";
// console.log(game_display.get_positions());
// console.log(game_display.all_tiles);
game_display.generate_display(9);
game_display.handle_events();
const player_one =  player("Test",'x');
const player_two =  player("Test2","o");