import TelegramBot from 'node-telegram-bot-api';

export default class TelegramBotService {
  constructor() {
    this.token = '230686792:AAF42GwXm2ntPWcn1IYKemkt_mBf2QsCQTU';
    this.options = {
      polling: true
    };
    var charts = [];
    var bot = new TelegramBot(this.token, this.options);

    bot.getMe().then((me) => {
      console.log(me);
    });

    bot.onText(/\/start/, function (msg) {
      console.log(charts);
      var chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Hello!');
      charts.push(chatId);
      console.log(charts);
      bot.sendMessage(chatId, 'Thank, yous id saved');
    });

    this.Bot = bot;
    this.Chats = charts;
  }

  // send(chatId, message) {
  //   this.bot.sendMessage(chatId, message);
  // }

  publish(test) {
    console.log(this.Chats);
    let chats = this.Chats;
    for (var i = 0; i < chats.length; i++) {
      let chatid = chats[i];
      this.Bot.sendMessage(chatid, test.title);
    };
  }
};
