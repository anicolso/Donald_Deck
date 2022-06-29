const express = require('express')
const path = require('path')
const app = express();
const http = require('http').Server(app);
const fetch = require("node-fetch");
const { Pool, Client } = require('pg');

const PORT = process.env.PORT || 5000
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function deckID() {
  await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(async (response) => {
      if (response.ok) {
        var temp = await response.json();
        newDeckID = temp.deck_id;
      }
      else {
        throw new Error('Response did not return 200');
      }
    })
    .catch(async (error) => {
        console.log(error);
    })
  return newDeckID;
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.redirect('loginUI.html'));
app.get('/test', (req, res) => res.render('pages/soloBlackjackTEST'));
app.post('/login', (req, res) => {
    var loginUsername = req.body.username;
    var loginPassword = req.body.password;
    var loginQuery = `SELECT * FROM users WHERE users.username = '${loginUsername}'`;
    console.log(loginQuery);
    pool.query(loginQuery, (error, result) => {
        if (error)
            res.send(error);
        else {
            var results = {'rows': result.rows };
            console.log(results.rows);
            if (results.rows === undefined || results.rows.length == 0) {
                res.render('pages/loginIncorrect.ejs');
            }
            else {
                var databasePassword = results.rows[0].password;
                if (loginPassword === databasePassword) {
                    if (loginUsername === "admin") {
                        res.redirect('/admin');
                    }
                    else {
                        res.render('pages/mainMenu.ejs', results );
                    }
                }
                else {
                    res.render('pages/loginIncorrect.ejs');
                }
            }
        }
    });
});

app.post('/createAccount', (req, res) => {
    var regexTest = /^[a-z0-9]+$/i;
    var createUsername = req.body.username;
    var createPassword = req.body.password;
    if (!regexTest.test(createUsername) || !regexTest.test(createPassword)) {
        console.log("Non alpha numeric username/password.");
        res.render('pages/createAccountNonAlpha.ejs')
    }
    else {
        var createQuery = ` insert into users(username, password, credits) select '${createUsername}', '${createPassword}', 2000 where not exists (select 1 from users where username='${createUsername}');`;
        console.log(createQuery);
        pool.query(createQuery, (error, result) => {
            if (error)
                res.send('ERROR',error);
            else {
                if (result.rowCount === 0) {
                    res.render('pages/createAccountIncorrect.ejs')
                }
                else {
                    res.render('pages/loginPostCreate.ejs')
                }
            }
        });
    }
});

app.post('/myStats', (req, res) => {
    var user = req.body.id;
    var findUser = `SELECT * FROM users WHERE users.username = '${user}'`;
    console.log(findUser);
    pool.query(findUser, (error, result) => {
        if (error)
            res.send('ERROR',error);
        else {
            if (result.rowCount === 0) {
                res.render('pages/createAccountIncorrect.ejs');
            }
            else {
                var userinfo= {'row' : result.rows[0]};
                res.render('pages/mystats.ejs', userinfo);
            }
        }
    });
});

app.post('/mainMenu', (req,res) => {
    var user = req.body.id;
    var findUser = `SELECT * FROM users WHERE users.username = '${user}'`;
    console.log(findUser);
    pool.query(findUser, (error, result) => {
        if (error)
            res.send('ERROR',error);
        else {
            if (result.rowCount === 0) {
                res.render('pages/createAccountIncorrect.ejs');
            }
            else {
                var userinfo = {'rows': result.rows };
                res.render('pages/mainMenu.ejs', userinfo );
            }
        }
    });
});

//------------------------------------------- blackjack game related stuff below
var roomNum;
var playerIDs = {'solo': []};
var usernames = {'solo': []};
var rooms = {};
var balances = {'solo': []};

app.post('/soloBlackjack',(req,res) => {
    console.log("post soloBlackjack");
    var user = req.body.id;
    roomNum = 'solo';
    var findUser = `SELECT * FROM users WHERE users.username = '${user}'`;
    console.log(findUser);
    pool.query(findUser, (error,result) => {
        if (error)
            res.send(error);
        else {
            var userinfo= {'row' : result.rows[0]};
            console.log(userinfo);
            if (userinfo === undefined || result.rows.length == 0) {
                res.redirect('loginUI.html'); //fail in staying logged in
            }
            else {
                res.render('pages/soloBlackjack', userinfo);
            }
        }
    })
});

app.post('/multiplayerBlackjack',(req,res) => {
    var user = req.body.id;
    var findUser = `SELECT * FROM users WHERE users.username = '${user}'`;
    console.log(findUser);
    pool.query(findUser, async (error,result) => {
      try{
        if (error)
            res.send(error);
        else {
            var userinfo= {'row' : result.rows[0]};
            console.log(userinfo);
            if (userinfo === undefined || result.rows.length == 0) {
                res.redirect('loginUI.html'); //fail in staying logged in
            }
            else {
                roomNum = await deckID();
                console.log("CHECK HERE", roomNum);
                playerIDs[`${roomNum}`] = [];
                usernames[`${roomNum}`] = [];
                balances[`${roomNum}`] = [];
                res.render('pages/multiplayerBlackjack', userinfo);
            }
        }
      }
      catch (error) {
        res.send(error);
      }
    })
});

app.post('/joinMatch', (req, res) => {
    var user = req.body.id;
    var findUser = `SELECT * FROM users WHERE users.username = '${user}'`;
    console.log(findUser);
    pool.query(findUser, (error, result) => {
        if (error)
            res.send('ERROR',error);
        else {
            if (result.rowCount === 0) {
                res.render('pages/createAccountIncorrect.ejs');
            }
            else {
                var userinfo= {'row' : result.rows[0]};
                res.render('pages/JoinMatch.ejs', userinfo);

            }
        }
    });
});

app.post('/roomNum',(req,res) => {
    var user = req.body.id;
    roomNum = req.body.roomid;
    var findUser = `SELECT * FROM users WHERE users.username = '${user}'`;
    console.log(findUser);
    pool.query(findUser, async (error,result) => {
      try{
        if (error)
            res.send(error);
        else if(playerIDs[`${roomNum}`] == undefined) {
            var userinfo= {'row' : result.rows[0]};
            console.log(userinfo);
            res.render('pages/JoinMatchFail.ejs', userinfo);
        }
        else {
            var userinfo= {'row' : result.rows[0]};
            console.log(userinfo);
            if (userinfo === undefined || result.rows.length == 0) {
                res.redirect('loginUI.html'); //fail in staying logged in
            }
            else {
                console.log("CHECK HERE", roomNum);
                res.render('pages/multiplayerBlackjack', userinfo);
            }
        }
      }
      catch (error) {
        res.send(error);
      }
    })
});

//rebuys
app.post('/rebuy', (req,res) => {
    var user = req.body.id;
    var findUser = `SELECT * FROM users WHERE users.username = '${user}'`;
    console.log(findUser);
    pool.query(findUser, (error, result) => {
        if (error) {
            res.send('ERROR',error);
        }
        else {
            if (result.rowCount === 0) {
                res.render('pages/createAccountIncorrect.ejs');
            }
            else {
                newCreditCount = result.rows[0].credits + 100;
                var update = `UPDATE users SET credits = ${newCreditCount} WHERE users.username = '${user}';`;
                console.log(result.rows[0].rebuys);
                var newrebuys = result.rows[0].rebuys + 1;
                update = update + ` UPDATE users SET rebuys = ${newrebuys} WHERE users.username = '${user}';`;
                console.log(update);
                pool.query(update, (erroragain,resultagain) => {
                    if (erroragain)
                        res.send('ERROR', erroragain);
                        //otherwise, do nothing i suppose? or maybe send something?
                    else {
                        pool.query(findUser, (erragains, finalinfo) => {
                            if (erragains) {
                                res.send('ERROR', erragains);
                            }
                            else {
                                var userinfo = {'row': result.rows[0]};
                                res.render('pages/mystats.ejs', userinfo);
                            }
                        })

                    }
                });
            }
        }
    });
});

// If Log in as administrator, redirect to here
app.get('/admin', (req,res) => {
    var GetUsersQuery = `SELECT * FROM USERS WHERE users.username != 'admin'`;
    console.log(GetUsersQuery);
    pool.query(GetUsersQuery, (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            var results = {'rows': result.rows};
            res.render('pages/adminview.ejs', results);
        }
    })
});

//For socket.io using express
const io = require('socket.io')(http);
var server = http.listen(PORT, function() {
    console.log('listening http index.js Port: ' + PORT);
});

// .io stuff
io.on('connection', function(socket) {
    console.log('connection index');
    //Check how long it has been since last login
    rooms[`${socket.id}`] = roomNum;
    socket.join(`${roomNum}`);
    playerIDs[`${roomNum}`].push(socket.id);
    balances[`${roomNum}`].push(0);

    io.to(`${roomNum}`).emit('IDlist', playerIDs[`${roomNum}`]);
    io.to(`${roomNum}`).emit('room', roomNum);
    console.log(playerIDs);
    
    socket.on('chat msg', function(message) {
        console.log(roomNum);
        console.log(message[1]);
        if(rooms[`${socket.id}`] == message[1]) {
          io.to(`${rooms[`${socket.id}`]}`).emit('chat msg', socket.username + ' said: ' + message[0] );
        }
    });
    socket.on('username', function(username) {
        socket.username = username;
        console.log("username " + username + " and socket.id: " + socket.id);
        io.to(`${rooms[`${socket.id}`]}`).emit('chat msg', `${socket.username} has joined the chat!`);
        usernames[`${roomNum}`].push(socket.username);
        io.to(`${rooms[`${socket.id}`]}`).emit('usernames', usernames[`${roomNum}`]);
    });
    socket.on('checkBet', function(bet) {
        var findUser = `SELECT * FROM users WHERE users.username = '${socket.username}'`;
        console.log(findUser);
        pool.query(findUser, (error, result) => {
            if (error)
                socket.emit('ERROR',error);
            else {
                if (result.rowCount === 0) {
                    socket.emit('ERROR', error);
                }
                else {
                    var credits = result.rows[0].credits;
                    console.log(`index.js finds credits: `, credits);
                    var newCreditCount = credits - bet;
                    if (newCreditCount >= 0) {
                        //pool query again replace new credit count
                        var UpdateQuery = `UPDATE users SET credits = ${newCreditCount} WHERE users.username = '${socket.username}'`;
                        console.log(UpdateQuery);
                        pool.query(UpdateQuery, (error,result) => {
                            if (error) {
                                socket.emit("ERROR:", error);
                            }
                            else {
                                io.to(`${socket.id}`).emit('startGame', newCreditCount);
                                io.to(`${socket.id}`).emit('newCredits', newCreditCount);
                                //balances subtract
                                var j = playerIDs[`${rooms[`${socket.id}`]}`].indexOf(socket.id);
                                // get index
                                var playerbalance = balances[`${rooms[`${socket.id}`]}`][j];
                                //console.log("playerbalance:", playerbalance);
                                playerbalance = playerbalance - bet;
                                balances[`${rooms[`${socket.id}`]}`][j] = playerbalance;
                                //emit to everyone new balances
                                io.to(`${rooms[`${socket.id}`]}`).emit('balances',balances[`${roomNum}`]);

                            }
                        });
                    }
                }
            }
        });
    });
    
    socket.on('blackjackPay',function(bet) { //if get 21 - pay 3:2
        var findUser = `SELECT * FROM users WHERE users.username = '${socket.username}'`;
        console.log(findUser);
        pool.query(findUser, (error, result) => {
            if (error)
                socket.emit('ERROR', error);
            else {
                if (result.rowCount === 0) {
                    socket.emit('ERROR', error);
                }
                else {
                    var credits = result.rows[0].credits;
                    var newCreditCount = bet *3 + credits;
                    var addCredits = `UPDATE users SET credits = ${newCreditCount} WHERE users.username = '${socket.username}'`;
                    pool.query(addCredits, (err, res) => {
                        if (error) socket.emit("ERROR", err);
                        else {
                            console.log("index bjplay new credits: ", newCreditCount);
                            io.to(`${socket.id}`).emit('newCredits', newCreditCount);
                            // balances
                            var j = playerIDs[`${rooms[`${socket.id}`]}`].indexOf(socket.id);
                            // get index
                            var playerbalance = balances[`${rooms[`${socket.id}`]}`][j];
                            //console.log("playerbalance:", playerbalance);
                            playerbalance = playerbalance + 3* bet;
                            balances[`${rooms[`${socket.id}`]}`][j] = playerbalance;
                            //emit to everyone new balances
                            io.to(`${rooms[`${socket.id}`]}`).emit('balances',balances[`${roomNum}`]);
                        }
                    });
                }
            }
        });
    });

    socket.on('payout', function(bet) {
        var findUser = `SELECT * FROM users WHERE users.username = '${socket.username}'`;
        console.log(findUser);
        pool.query(findUser, (error, result) => {
            if (error)
                socket.emit('ERROR', error);
            else {
                if (result.rowCount === 0) {
                    socket.emit('ERROR', error);
                }
                else {
                    var credits = result.rows[0].credits;
                    var newCreditCount = bet * 2 + credits;
                    var addCredits = `UPDATE users SET credits = ${newCreditCount} WHERE users.username = '${socket.username}'`;
                    console.log(addCredits);
                    pool.query(addCredits, (err, res) => {
                        if (error) socket.emit("ERROR", err);
                        else {
                            io.to(`${socket.id}`).emit('newCredits', newCreditCount);
                            //balances
                            var j = playerIDs[`${rooms[`${socket.id}`]}`].indexOf(socket.id);
                            // get index
                            var playerbalance = balances[`${rooms[`${socket.id}`]}`][j];
                            //console.log("playerbalance:", playerbalance);
                            playerbalance = playerbalance + 2* bet;
                            balances[`${rooms[`${socket.id}`]}`][j] = playerbalance;
                            //emit to everyone new balances
                            io.to(`${rooms[`${socket.id}`]}`).emit('balances',balances[`${roomNum}`]);
                        }
                    });
                }
            }
        });

    });

    //test
    socket.on('disconnect', (reason) => {
        var j = playerIDs[`${rooms[`${socket.id}`]}`].indexOf(socket.id);
        playerIDs[`${rooms[`${socket.id}`]}`].splice(j,1);
        usernames[`${rooms[`${socket.id}`]}`].splice(j,1);
        balances[`${rooms[`${socket.id}`]}`].splice(j,1);
        if(playerIDs[`${rooms[`${socket.id}`]}`].length == 0) {
            if(rooms[`${socket.id}`] != 'solo') {
                delete playerIDs[`${rooms[`${socket.id}`]}`];
                delete usernames[`${rooms[`${socket.id}`]}`];
                delete balances[`${rooms[`${socket.id}`]}`];
            }
            delete rooms[`${socket.id}`];
        }
            else {
                io.to(`${rooms[`${socket.id}`]}`).emit('usernames', usernames[`${roomNum}`]); 
                io.to(`${rooms[`${socket.id}`]}`).emit('IDlist',playerIDs[`${roomNum}`]);
                io.to(`${rooms[`${socket.id}`]}`).emit('chat msg',`${socket.username} has left`);
                io.to(`${rooms[`${socket.id}`]}`).emit('balances',balances[`${roomNum}`]);
            }
    });
});
