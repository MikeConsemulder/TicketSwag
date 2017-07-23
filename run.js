var request = require("request");
var openUrl = require("openurl");
const cheerio = require('cheerio');
var $;

var url = 'https://www.ticketswap.nl/event/a-campingflight-to-lowlands-paradise/regular/fcc6c783-6b32-4abd-8fe6-e9d0369c14df/20635';

var timer;
var interval = 500;
var dots = 0;

startTimer();

function startTimer(){

    timer = setInterval(function() {

        checkTicketSwap();
    }, interval);
}


function checkTicketSwap() {

    request({

        uri: url,
    }, function (error, response, body) {

        checkHtmlForTickets(body);
    });
}

function checkHtmlForTickets(htmlBody){

    $ = cheerio.load(htmlBody);
    var aangeboden = $('.counter-available .counter-value').text();
    var verkocht = $('.counter-sold .counter-value').text();
    var link;

    if(aangeboden === ''){

        console.log('Faackkaaayouuu ticketswap');
        clearInterval(timer);
        openUrl.open(url);
    }

    if(aangeboden > 0) {

        link = $('.listings .listings--items .listings-item .listings-item--title h3 a');
        ahref = link.attr('href');

        clearInterval(timer);
        url = 'https://www.ticketswap.nl' + ahref;
        openUrl.open(url);

    }else{

        var dotsDisplay = '';
        for(i = 0; i < dots; i++){

            dotsDisplay += '.';
        }

        if(dots > 1){

            dots = 0;
        }
        console.log('Aantal verkocht: ' + verkocht + ' aantal aangeboden: '+ aangeboden + dotsDisplay);
        dots++;
    }
}