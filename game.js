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
    let active_gamemode = chosen_gamemode;
    let board = [
    ['','',''],
    ['','',''],
    ['','',''],
    ];
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
    return{board,get_board,check_legal_move,update_board,check_win_condition,reset_board};
})();
const game_display = () => {
    //TBD
};