var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var path = require("path")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'))
var PORT = process.env.PORT || 3000;

login = false
login_exists = false

var tab = [
    { id: 1, login: "AAA", password: "PASS1", wiek: 10, uczen: "on", plec: "m" },
    { id: 2, login: "BBB", password: "PASS2", wiek: 15, uczen: "", plec: "k" },
    { id: 3, login: "CCC", password: "PASS3", wiek: 30, uczen: "on", plec: "k" },
    { id: 4, login: "DDD", password: "PASS4", wiek: 6, uczen: "on", plec: "m" }
]



app.post('/login', function (req, res) {
    console.log(tab)
    for (i = 0; i < tab.length; i++) {
        if (tab[i].login == req.body.login && tab[i].password == req.body.password) {
            login = true
            res.redirect('/admin')
        }
    }
    if (!login) {
        res.send('błedne dane')
    }
})

app.post('/register', function (req, res) {
    for (i = 0; i < tab.length; i++) {
        if (tab[i].login == req.body.login) {
            login_exists = false
            break;
        }
        else {
            login_exists = true
        }
    }
    if (login_exists) {
        tab.push(req.body)
        console.log(tab)
        tab[tab.length - 1].id = tab.length
        res.send('Witaj ' + req.body.login + '. Zostałeś zarejestrowany!')
    }
})

app.post('/sort', function (req, res) {

})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/pages/main.html'))
})
app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/pages/main.html'))
})
app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/pages/register.html'))
})
app.get('/login', function (req, res) {

    res.sendFile(path.join(__dirname + '/static/pages/login.html'))
})
app.get('/admin', function (req, res) {
    if (login) {
        res.sendFile(path.join(__dirname + '/static/pages/admin.html'))
    }
    else {
        res.sendFile(path.join(__dirname + '/static/pages/odrzucenie.html'))
    }
})
app.get('/logout', function (req, res) {
    login = false
    res.redirect('/main')
})
app.get('/show', function (req, res) {


    if (login) {
        console.log(tab)
        let tabela_show = '<pre><a href="/sort">sort</a> <a href="/gender">gender</a> <a href="/show">show</a></br></br><table style="border: 1px solid black; border-collapse: collapse">'
        for (i = 0; i < tab.length; i++) {
            tabela_show += '<tr><td style="border: 1px solid black">id: ' + (i + 1) + '</td><td style="border: 1px solid black">user: ' + tab[i].login + ' - ' + tab[i].password + '</td>'
            if (tab[i].uczen == 'on') {
                tabela_show += '<td style="border: 1px solid black">uczen: <input type=checkbox checked disabled></td>'
            }
            else {
                tabela_show += '<td style="border: 1px solid black">uczen: <input type=checkbox disabled></td>'
            }
            tabela_show += '<td style="border: 1px solid black">wiek: ' + tab[i].wiek + '</td><td style="border: 1px solid black">płeć: ' + tab[i].plec + '</td>'

        }
        tabela_show += '</table>'
        res.send(tabela_show)
    }
    else {
        res.send('nie masz dostepu do strony')
    }

})
app.get('/gender', function (req, res) {
    if (login) {
        let tabela_gender_k = '<pre><a href="/sort">sort</a> <a href="/gender">gender</a> <a href="/show">show</a></br></br><table style="border: 1px solid black; border-collapse: collapse">'
        let tabela_gender_m = '<table style="border: 1px solid black; border-collapse: collapse">'
        for (i = 0; i < tab.length; i++) {
            if (tab[i].plec == "M" || tab[i].plec == 'm') {
                tabela_gender_m += '<tr><td style="border: 1px solid black">id: ' + tab[i].id + '</td><td style="border: 1px solid black">płeć: ' + tab[i].plec + '</tr>'
            }
            else if (tab[i].plec == "K" || tab[i].plec == 'k') {
                tabela_gender_k += '<tr><td style="border: 1px solid black">id: ' + tab[i].id + '</td><td style="border: 1px solid black">płeć: ' + tab[i].plec + '</tr>'
            }
        }
        tabela_gender_k += '</table></br>'
        tabela_gender_m += '</table>'

        tabela_gender = tabela_gender_k + tabela_gender_m
        res.send(tabela_gender)
    }
    else {
        res.send('nie masz dostepu do strony')
    }
})
app.get('/sort', function (req, res) {
    if (login) {
    let tabela_show = '<pre><a href="/sort">sort</a> <a href="/gender">gender</a> <a href="/show">show</a></br></br><input type="radio" name="radio"/> Rosnąco  <input type="radio" name="radio"/> Malejąco</br></br><table style="border: 1px solid black; border-collapse: collapse">'
    for (i = 0; i < tab.length; i++) {
        tabela_show += '<tr><td style="border: 1px solid black">id: ' + (i + 1) + '</td><td style="border: 1px solid black">user: ' + tab[i].login + ' - ' + tab[i].password + '</td>'
        if (tab[i].uczen == 'on') {
            tabela_show += '<td style="border: 1px solid black">uczen: <input type=checkbox checked disabled></td>'
        }
        else {
            tabela_show += '<td style="border: 1px solid black">uczen: <input type=checkbox disabled></td>'
        }
        tabela_show += '<td style="border: 1px solid black">wiek: ' + tab[i].wiek + '</td><td style="border: 1px solid black">płeć: ' + tab[i].plec + '</td>'

    }
    tabela_show += '</table>'
    res.send(tabela_show)
    }
    else {
        res.send('nie masz dostepu do strony')
    }
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})