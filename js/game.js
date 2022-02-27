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
    let board = [
    ['','',''],
    ['','',''],
    ['','',''],
    ];
    let turn = 1;
    const get_board = () => board;
    const check_legal_move = (row,col,shape1,shape2) => {
        if (board[row][col] == shape1 || board[row][col] == shape2)
            return false;
        else
            return true;
    }
    const update_board = (row,col,shape) => board[row][col] = shape;
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
                if (temp[0][i] == shape1)
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
                    if (temp[0][2] == shape1)
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
                    if (counter == board.length * board.length)
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
    const check_turn = (shape_one,shape_two) => {
        //TBD
    }
    return{board,turn,get_board,check_legal_move,update_board,check_win_condition,reset_board,check_turn};
})();
const game_display = (() => {
    const all_tiles = [];
    const positions = document.querySelector(".positions");
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
    const handle_events = () => {
        all_tiles.forEach(tile =>
            tile.addEventListener('click',function(){
                //TBD
                alert("hello world");
            }));
    }
    return{all_tiles,positions,get_positions,generate_display,handle_events};
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
const player_one =  player("Test","x");
const player_two =  player("Test2","o");