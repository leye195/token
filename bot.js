var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('1268108611:AAF4ISCSdFIw6IiG4_HVEQrF0HL9cM5Ssc0');

const apikey = "36f59521a8b032374f564789247312f603885d906d586eed3c3722f3ce6c867f";
const apikey_btc = "93ff249f-e05e-4a4a-9584-ee373ffba6c9";

let date_ob = new Date();
let cron = require('node-cron');

// current date//
// adjust 0 before single digit date//
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes

let minutes = date_ob.getMinutes();

// current seconds//

let seconds = date_ob.getSeconds();

const introMessage = '토큰인사이트(TokenInsight) 텔레그램방에 오신 것을 환영합니다!\n\n/start - 토큰인사이트 대시보드';

bot.command('start', ctx => {
    sendstartMessage(ctx);
})

bot.hears('sex', ctx => {
    ctx.reply('Let\'s have instant noodle');
})

bot.hears('pussy', ctx => {
    ctx.reply('Open your legs!');
})

bot.hears('쓰리썸', ctx => {
    ctx.reply('텐트로 갈까요?');
})

bot.hears('흑우', ctx => {
    ctx.reply('韭菜');
})

bot.hears('비트코인 가격', ctx => {
    ctx.reply('알아서 찾아보세요..;;');
})

bot.hears('한강', ctx => {
    ctx.reply('가즈ㅡㅡ아ㅏ아ㅏ!');
})

bot.hears('뒤질래', ctx => {
    ctx.reply('홍대 놀이터로 나와라');
})

bot.hears('이남녕', ctx => {
    ctx.reply('칭화대 출신이며 현재는 중국건설은행에서 재직 중이다. 중국을 혐오하지만 중국계 은행에서 일하는 다소 모순적인 삶을 살고 있다');
})

bot.hears('헨리', ctx => {
    ctx.reply('병신 중에 병신으로 그냥 병신이다. 근데 대표를 맡고 있다. 물론 그 기업도 병맛으로 가득차있다');
})

bot.hears('이준성', ctx => {
    ctx.reply('클레이튼 팀원으로 곧 이직할 예정이다. 링크드인으로 이직 제의 주길 바란다');
})

bot.hears('권병성', ctx => {
    ctx.reply('헤리티지 블록스의 전대표로, 빡쳐서 나왔다.');
})

bot.hears('야', ctx => {
    ctx.reply('왜 임마');
})


bot.action('start', ctx => {
    sendstartMessage(ctx);
})

function sendstartMessage(ctx) {
    let startMessage = '토큰인사이트(TokenInsight) 커뮤니티에 오신 것을 환영합니다.\n\n저는 토큰인사이트의 인공지능 애널리스트입니다. 아래는 저희 대시보드로, 저를 추가하시면 편리하게 사용하실 수 있습니다.';
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "토큰인사이트 데일리", callback_data: 'daily' }
                    ],
                    [
                        { text: "암호화폐 가격", callback_data: 'price' }
                    ],
                    [
                        { text: "토큰인사이트 랭킹", callback_data: 'rank' }
                    ],
                    [
                        { text: "토큰인사이트 공홈", url: 'https://tokeninsight.com/' }
                    ],
                    [
                        { text: "토큰인사이트 코리아 블로그", url: 'https://tokeninsight.blogspot.com/' }
                    ]

                ]
            }
        })
};


cron.schedule('* 9 * * *', () => {
    sendDaily()
}).start();




let cont = `토큰인사이트 데일리

토큰인사이트(TokenInsight)의 데이터에 따르면, 블록체인 산업의 전체적인 양상을 나타내는 TI 지수는 한국시간 9시 기준 [TI_Index.Now()]를 기록하였고, 전일대비 변동폭은[TI_Index.Now() - TI_Index.(Now() - 24h)] % 입니다.


이외에도, 토큰인사이트가 긴밀히 주시하는 10가지 블록체인 산업 중, 24시간 동안 최고 상승폭을 기록한 분야는[Industry.Highest]이며, [Industry.Highest.Change()] % 증가(감소)했습니다.


최저 상승폭을 기록한 분야는[Industry.Lowest]으로, [Industry.Lowest.Change()] % 증가(감소)했습니다.


모니터링에 따르면, 비트코인 24H 체결액은 $[Volume]으로, 활성화 주소수는 전날보다[Address.Change] % 증가(감소)했으며, 이체횟수는 어제보다[Transfer.Change] % 증가(감소)했습니다.
`;

bot.action('daily', async ctx => {

    try {
            var d = new Date();
            ctx.deleteMessage();
            bot.telegram.sendMessage(ctx.chat.id, d+"\n\n"+cont, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '메뉴로 돌아가기', callback_data: 'start' }
                        ]
                    ]
                }
            })

        } catch (err) {
            console.log(err);
            ctx.reply('Error Encountered');
        }

    }
)

async function sendDaily() {
    var d = new Date();
    bot.telegram.sendMessage('696812706', d + "\n" + cont);
}

bot.action('price', ctx => {
    let pricemessage = '암호화폐 가격을 열람할 수 있습니다. 암호화폐를 선택하십시오';
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, pricemessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "BTC", callback_data: 'price-BTC' },
                    { text: "ETH", callback_data: 'price-ETH' }
                ],
                [
                    { text: "BCH", callback_data: 'price-BCH' },
                    { text: "BSV", callback_data: 'price-BSV' }
                ],
                [
                    { text: "XRP", callback_data: 'price-XRP' },
                    { text: "EOS", callback_data: 'price-EOS' }
                ],
                [
                    { text: "메뉴로 돌아가기", callback_data: 'start' }
                ]
            ]
        }
    })
})

bot.action('rank', ctx => {
    let rankmessage = '토큰인사이트 랭킹 리스트입니다. 열람하시려는 랭킹을 선택하십시오';
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, rankmessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "암호화폐 레이팅", url: 'https://tokeninsight.com/rating?type=1' },
                    { text: "크립토 퀀트 랭킹", url: 'https://tokeninsight.com/quantitative?type=1' }
                ],
                [
                    { text: "거래소 랭킹", url: 'https://tokeninsight.com/exchangerank' },
                    { text: "현물거래소", url: 'https://tokeninsight.com/exchange?id=1' }
                ],
                [
                    { text: "파생상품 거래소", url: 'https://tokeninsight.com/exchange?id=2' },
                    { text: "거래소 실제 거래량", url: 'https://tokeninsight.com/adjustedVolume' }
                ],
                [
                    { text: "크립토 월렛 랭킹", url: 'https://tokeninsight.com/research?id=4' },
                    { text: "마이닝풀 랭킹", url: 'https://tokeninsight.com/research?id=5' }
                ],
                [
                    { text: "디앱 랭킹", url: 'https://tokeninsight.com/research?id=6' }
                ],
                [
                    { text: "메뉴로 돌아가기", callback_data: 'start' }
                ]
            ]
        }
    })
})


bot.action('price-BTC', async ctx => {
    try {

        let res1 = await axios.get(`https://api.blockchain.info/stats?key=93ff249f-e05e-4a4a-9584-ee373ffba6c9`)
        let message1=
            `
해시레이트: ${res1.hash_rate}
`;

        ctx.deleteMessage();
        bot.telegram.sendMessage(ctx.chat.id, message1, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '리스트로 돌아가기', callback_data: 'price' }
                    ]
                ]
            }
        })

    } catch (err) {
        console.log(err);
        ctx.reply('Error Encountered');
    }

})

let priceActionList = ['price-ETH', 'price-BCH', 'price-BSV'];
    bot.action(priceActionList, async ctx => {
        let symbol = ctx.match.split('-')[1];
        console.log(symbol);

        try {
            let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${apikey}`)
            let data = res.data.DISPLAY[symbol].USD

            console.log(data);

            let message =
                `
암호화폐명: ${symbol}
가격: ${data.PRICE}
시가: ${data.OPENDAY}
고가: ${data.HIGHDAY}
저가: ${data.LOWDAY}
공급량: ${data.SUPPLY}
시가총액: ${data.MKTCAP}
`;

            ctx.deleteMessage();
            bot.telegram.sendMessage(ctx.chat.id, message, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '리스트로 돌아가기', callback_data: 'price' }
                        ]
                    ]
                }
            })

        } catch (err) {
            console.log(err);
            ctx.reply('Error Encountered');
        }

    })



    bot.launch();