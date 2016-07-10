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
    var question = test.questions[0];
    console.log(question);
    let chats = this.Chats;
    for (var i = 0; i < chats.length; i++) {
      let chatid = chats[i];
      var opts = {
      // reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [
          [question.answers.answer_one],
          [question.answers.answer_second],
          [question.answers.answer_third],
          [question.answers.answer_fourth]]
      })
    };
      this.Bot.sendMessage(chatid, question.title, opts);
    };
  }
};
