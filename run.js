var request = require("request");
var openUrl = require("openurl");
const cheerio = require('cheerio');
var $;

var url = 'https://www.ticketswap.nl/event/awakenings-eindhoven/regular/9476ae2b-5622-4f02-8137-362abff371dd/541602';
//url = 'https://www.ticketswap.nl/event/gold-new-biki90-x-rgb-x-ketelhuis/ed9f37dc-1ff4-405a-aa34-80aa33b92246';
//url = 'https://www.ticketswap.nl/event/flawless-xxl/regular/ebbb410d-8df4-4dde-8b62-e7dff2a45e72/68187';

var timer;
var interval = 800;
var dots = 0;
var globalCounter = 0;

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

        //console.log(response);
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

	    globalCounter++;
        console.log(globalCounter + ': Aantal verkocht: ' + verkocht + ' aantal aangeboden: '+ aangeboden + dotsDisplay);
        dots++;
    }
}