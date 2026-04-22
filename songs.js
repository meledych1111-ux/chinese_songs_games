const SONGS = [
  {title:"🐯 两只老虎 (Два тигра)", lines:[{ch:"两只老虎，两只老虎", py:"liǎng zhī lǎohǔ, liǎng zhī lǎohǔ", ru:"Два тигра, два тигра"},{ch:"跑得快，跑得快", py:"pǎo de kuài, pǎo de kuài", ru:"Бегут быстро, бегут быстро"},{ch:"一只没有耳朵", py:"yī zhī méiyǒu ěrduo", ru:"Один без ушей"},{ch:"一只没有尾巴", py:"yī zhī méiyǒu wěiba", ru:"Один без хвоста"},{ch:"真奇怪，真奇怪", py:"zhēn qíguài, zhēn qíguài", ru:"Как странно, как странно"}]},
  {title:"⭐ 小星星 (Маленькая звёздочка)", lines:[{ch:"一闪一闪亮晶晶", py:"yī shǎn yī shǎn liàng jīngjīng", ru:"Мерцай, мерцай, ярко свети"},{ch:"满天都是小星星", py:"mǎn tiān dōu shì xiǎo xīngxīng", ru:"Всё небо в маленьких звёздах"},{ch:"挂在天上放光明", py:"guà zài tiān shàng fàng guāngmíng", ru:"Висишь на небе, сияя ярко"},{ch:"好像许多小眼睛", py:"hǎoxiàng xǔduō xiǎo yǎnjing", ru:"Как много маленьких глазок"}]},
  {title:"👋 你好歌 (Приветствие)", lines:[{ch:"你好，你好", py:"nǐ hǎo, nǐ hǎo", ru:"Здравствуй, здравствуй"},{ch:"早上好，下午好", py:"zǎoshang hǎo, xiàwǔ hǎo", ru:"Доброе утро, добрый день"},{ch:"谢谢你，不客气", py:"xièxie nǐ, bú kèqi", ru:"Спасибо тебе, не за что"},{ch:"再见，明天见", py:"zàijiàn, míngtiān jiàn", ru:"До свидания, до завтра"}]},
  {title:"🔢 数字歌 (Числа)", lines:[{ch:"一二三，三二一", py:"yī èr sān, sān èr yī", ru:"Раз два три, три два один"},{ch:"四五六，七八九", py:"sì wǔ liù, qī bā jiǔ", ru:"Четыре пять шесть, семь восемь девять"},{ch:"十", py:"shí", ru:"Десять"},{ch:"数数真有趣", py:"shǔ shǔ zhēn yǒuqù", ru:"Считать так интересно"}]},
  {title:"🎨 颜色歌 (Цвета)", lines:[{ch:"红色红色红苹果", py:"hóngsè hóngsè hóng píngguǒ", ru:"Красный, красный, красное яблоко"},{ch:"蓝色蓝色蓝天空", py:"lánsè lánsè lán tiānkōng", ru:"Синий, синий, синее небо"},{ch:"绿色绿色绿草地", py:"lǜsè lǜsè lǜ cǎodì", ru:"Зелёный, зелёный, зелёная трава"},{ch:"黄色黄色黄香蕉", py:"huángsè huángsè huáng xiāngjiāo", ru:"Жёлтый, жёлтый, жёлтый банан"}]},
  {title:"👨‍👩‍👧 家庭歌 (Семья)", lines:[{ch:"爸爸妈妈我爱你", py:"bàba māma wǒ ài nǐ", ru:"Папа, мама, я люблю вас"},{ch:"哥哥姐姐对我好", py:"gēge jiějie duì wǒ hǎo", ru:"Старший брат и сестра добры ко мне"},{ch:"我们是一家人", py:"wǒmen shì yī jiā rén", ru:"Мы одна семья"},{ch:"幸福快乐在一起", py:"xìngfú kuàilè zài yīqǐ", ru:"Счастливы и радостны вместе"}]},
  {title:"🐰 小兔子乖乖 (Зайчик)", lines:[{ch:"小兔子乖乖，把门开开", py:"xiǎo tùzi guāiguāi, bǎ mén kāikāi", ru:"Зайчик послушный, открой дверь"},{ch:"快点开开，我要进来", py:"kuài diǎn kāikāi, wǒ yào jìnlái", ru:"Открой скорее, я хочу войти"},{ch:"不开不开我不开", py:"bù kāi bù kāi wǒ bù kāi", ru:"Не открою, не открою, я не открою"},{ch:"妈妈没回来", py:"māma méi huílái", ru:"Мама ещё не вернулась"}]},
  {title:"🦆 数鸭子 (Утки)", lines:[{ch:"门前大桥下，游过一群鸭", py:"mén qián dàqiáo xià, yóu guò yī qún yā", ru:"Под мостом у ворот плывёт стая уток"},{ch:"快来快来数一数", py:"kuài lái kuài lái shǔ yī shǔ", ru:"Давай скорее посчитаем"},{ch:"二四六七八", py:"èr sì liù qī bā", ru:"Два четыре шесть семь восемь"},{ch:"嘎嘎嘎嘎真呀真多呀", py:"gā gā gā gā zhēn ya zhēn duō ya", ru:"Кря-кря-кря-кря, правда их много!"}]},
  {title:"🎒 上学歌 (Школа)", lines:[{ch:"太阳当空照，花儿对我笑", py:"tàiyáng dāngkōng zhào, huā er duì wǒ xiào", ru:"Солнце светит в небе, цветы улыбаются мне"},{ch:"小鸟说早早早", py:"xiǎo niǎo shuō zǎo zǎo zǎo", ru:"Птички говорят: доброе утро"},{ch:"你为什么背上小书包", py:"nǐ wèishénme bèi shàng xiǎo shūbāo", ru:"Почему ты несёшь маленький рюкзак?"},{ch:"我去上学校", py:"wǒ qù shàng xuéxiào", ru:"Я иду в школу"}]},
  {title:"🥕 拔萝卜 (Репка)", lines:[{ch:"拔萝卜拔萝卜，嗨吆嗨吆拔萝卜", py:"bá luóbo bá luóbo, hāi yō hāi yō bá luóbo", ru:"Тяни репку, тяни репку, эй-йо, эй-йо, тяни репку"},{ch:"老婆婆快快来，一起来帮忙", py:"lǎo pópo kuài kuài lái, yīqǐ lái bāngmáng", ru:"Бабушка, иди скорее, помогай вместе с нами"},{ch:"拔萝卜拔萝卜，嗨吆嗨吆拔不动", py:"bá luóbo bá luóbo, hāi yō hāi yō bá bú dòng", ru:"Тяни репку, тяни репку, эй-йо, эй-йо, не вытянуть"},{ch:"小花猫快快来，一起来帮忙", py:"xiǎo huāmāo kuài kuài lái, yīqǐ lái bāngmáng", ru:"Котёнок, иди скорее, помогай вместе с нами"}]},
  {title:"🎂 生日快乐 (ДР)", lines:[{ch:"祝你生日快乐", py:"zhù nǐ shēngrì kuàilè", ru:"Желаю тебе счастливого дня рождения"},{ch:"祝你生日快乐", py:"zhù nǐ shēngrì kuàilè", ru:"Желаю тебе счастливого дня рождения"},{ch:"祝你生日快乐", py:"zhù nǐ shēngrì kuàilè", ru:"Желаю тебе счастливого дня рождения"},{ch:"祝你生日快乐", py:"zhù nǐ shēngrì kuàilè", ru:"Желаю тебе счастливого дня рождения"}]},
  {title:"🎉 新年好 (Новый год)", lines:[{ch:"新年好呀新年好", py:"xīnnián hǎo ya xīnnián hǎo", ru:"С Новым годом, с Новым годом"},{ch:"祝贺大家新年好", py:"zhùhè dàjiā xīnnián hǎo", ru:"Поздравляю всех с Новым годом"},{ch:"我们唱歌我们跳舞", py:"wǒmen chànggē wǒmen tiàowǔ", ru:"Мы поём, мы танцуем"},{ch:"祝贺大家新年好", py:"zhùhè dàjiā xīnnián hǎo", ru:"Поздравляю всех с Новым годом"}]},
  {title:"🐱 小猫咪 (Котёнок)", lines:[{ch:"小猫咪小猫咪", py:"xiǎo māomī xiǎo māomī", ru:"Котёнок, котёнок"},{ch:"喵喵喵", py:"miāo miāo miāo", ru:"Мяу мяу мяу"},{ch:"你在哪里呀", py:"nǐ zài nǎlǐ ya", ru:"Где ты?"},{ch:"我在这里呀", py:"wǒ zài zhèlǐ ya", ru:"Я здесь!"}]},
  {title:"🚣 让我们荡起双桨 (Грести)", lines:[{ch:"让我们荡起双桨", py:"ràng wǒmen dàng qǐ shuāngjiǎng", ru:"Давайте возьмём вёсла"},{ch:"小船儿推开波浪", py:"xiǎo chuán er tuī kāi bōlàng", ru:"Лодочка раздвигает волны"},{ch:"海面倒映着美丽的白塔", py:"hǎimiàn dàoyìng zhe měilì de bái tǎ", ru:"На море отражается красивая белая башня"},{ch:"四周环绕着绿树红墙", py:"sìzhōu huánrào zhe lǜ shù hóng qiáng", ru:"Вокруг зелёные деревья и красные стены"}]},
  {title:"🌸 春天在哪里 (Весна)", lines:[{ch:"春天在哪里呀", py:"chūntiān zài nǎlǐ ya", ru:"Где же весна?"},{ch:"春天在那青翠的山林里", py:"chūntiān zài nà qīngcuì de shānlín lǐ", ru:"Весна в зелёных горах и лесах"},{ch:"这里有红花呀这里有绿草", py:"zhèlǐ yǒu hónghuā ya zhèlǐ yǒu lǜcǎo", ru:"Здесь красные цветы, здесь зелёная трава"},{ch:"还有那会唱歌的小黄鹂", py:"hái yǒu nà huì唱歌的 xiǎo huánglí", ru:"И ещё маленькие иволги, которые поют"}]},
  {title:"🎈 找朋友 (Друг)", lines:[{ch:"找呀找呀找朋友", py:"zhǎo ya zhǎo ya zhǎo péngyou", ru:"Ищу, ищу, ищу друга"},{ch:"找到一个好朋友", py:"zhǎo dào yīgè hǎo péngyou", ru:"Нашёл хорошего друга"},{ch:"敬个礼呀握握手", py:"jìng gè lǐ ya wò wò shǒu", ru:"Отдам честь и пожму руку"},{ch:"你是我的好朋友", py:"nǐ shì wǒ de hǎo péngyou", ru:"Ты мой хороший друг"}]},
  {title:"🐴 小毛驴 (Осёл)", lines:[{ch:"我有一只小毛驴", py:"wǒ yǒu yī zhī xiǎo máolǘ", ru:"У меня есть маленький осёл"},{ch:"我从来也不骑", py:"wǒ cónglái yě bù qí", ru:"Я никогда на нём не езжу"},{ch:"有一天我心血来潮", py:"yǒu yītiān wǒ xīnxuèláicháo", ru:"Однажды мне захотелось"},{ch:"骑着去赶集", py:"qí zhe qù gǎnjí", ru:"Поехать на рынок верхом"}]},
  {title:"🎵 童年 (Детство)", lines:[{ch:"池塘边的榕树上", py:"chítáng biān de róngshù shàng", ru:"На фикусе у пруда"},{ch:"知了在声声叫着夏天", py:"zhīliǎo zài shēngshēng jiào zhe xiàtiān", ru:"Цикады стрекочут о лете"},{ch:"操场边的秋千上", py:"cāochǎng biān de qiūqiān shàng", ru:"На качелях у спортплощадки"},{ch:"只有蝴蝶停在上面", py:"zhǐyǒu húdié tíng zài shàngmiàn", ru:"Только бабочки сидят"}]},
  {title:"🐟 小鱼의梦 (Рыбка)", lines:[{ch:"小鱼小鱼游游游", py:"xiǎo yú xiǎo yú yóu yóu yóu", ru:"Рыбка, рыбка, плыви-плыви"},{ch:"游到水里做个梦", py:"yóu dào shuǐ lǐ zuò gè mèng", ru:"Плыви в воде и мечтай"},{ch:"梦见自己长翅膀", py:"mèngjiàn zìjǐ zhǎng chìbǎng", ru:"Приснилось, что выросли крылья"},{ch:"飞到天上去玩耍", py:"fēi dào tiān shàng qù wánshuǎ", ru:"Полететь в небо играть"}]},
  {title:"🌙 月亮代表我的心 (Луна)", lines:[{ch:"你问我爱你有多深", py:"nǐ wèn wǒ ài nǐ yǒu duō shēn", ru:"Ты спрашиваешь, как сильно я тебя люблю"},{ch:"我爱你有几分", py:"wǒ ài nǐ yǒu jǐ fēn", ru:"Насколько велика моя любовь"},{ch:"我的情也真，我的爱也真", py:"wǒ de qíng yě zhēn, wǒ de ài yě zhēn", ru:"Мои чувства искренни, моя любовь праведная"},{ch:"月亮代表我的心", py:"yuèliang dàibiǎo wǒ de xīn", ru:"Луна представляет моё сердце"}]}
];
// ========== ДОБАВЛЕНИЕ ВИДЕОУРОКОВ (ПЕСНИ-ССЫЛКИ) ==========
const VIDEO_SONGS = [
  {emoji:"📜", title:"绝句 (Цзюэцзюй) — Ду Фу", url:"https://www.rednote.com/explore/69e724a2000000001a02da93", desc:"Классическое стихотворение эпохи Тан"},
  {emoji:"📚", title:"劝学 (Побуждение к учению)", url:"https://www.rednote.com/explore/69d9d24d0000000023016749", desc:"О важности усердной учёбы"},
  {emoji:"🌸", title:"梅花 (Цветы сливы) — Ван Аньши", url:"https://www.rednote.com/explore/69d8af97000000001e00ecc5", desc:"О благородстве и стойкости"},
  {emoji:"📖", title:"幼小阶段古诗词全集（十一）", url:"https://www.rednote.com/explore/69e0808c0000000020038749", desc:"Сборник классических стихов"},
  {emoji:"👋", title:"赠汪伦 (Прощание с Ван Луном)", url:"https://www.rednote.com/explore/69dcab49000000001e00ce9b", desc:"Ли Бо о дружбе"},
  {emoji:"📜", title:"三字经 (3) — Троесловие", url:"https://www.rednote.com/explore/685bed09000000002400f2c2", desc:"Классика с пояснениями"},
  {emoji:"📚", title:"三字经 (2) — Троесловие", url:"https://www.rednote.com/explore/6857908c0000000022030714", desc:"Продолжение изучения"}
];

// Переопределяем renderSongs чтобы добавить видеоуроки
const originalRenderSongs = renderSongs;
renderSongs = function() {
  // Сначала показываем обычные песни
  originalRenderSongs();

  // Добавляем раздел с видеоуроками
  let html = '<div style="margin: 30px 0 20px 0;"><hr style="border: none; height: 2px; background: linear-gradient(90deg, transparent, #ff6b35, transparent);"><h3 style="text-align: center; margin: 20px 0; color: #ff6b35;">🎬 ВИДЕОУРОКИ И СТИХИ</h3></div>';

  for(let i = 0; i < VIDEO_SONGS.length; i++) {
    let v = VIDEO_SONGS[i];
    html += `
      <div class="song-card" style="background: linear-gradient(135deg, #fff8f0, #fff); border-left: 5px solid #ff6b35;">
        <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
          <div style="font-size: 48px;">${v.emoji}</div>
          <div style="flex: 1;">
            <div class="song-title" style="font-size: 18px; margin-bottom: 8px; text-align: left;">${v.title}</div>
            <div style="font-size: 14px; color: #666;">${v.desc}</div>
          </div>
          <a href="${v.url}" target="_blank" rel="noopener noreferrer"
             style="background: linear-gradient(135deg, #ff6b35, #ff9a44); color: white; padding: 12px 24px; border-radius: 40px; text-decoration: none; font-weight: 700; font-size: 14px;">
            🎬 Смотреть
          </a>
        </div>
      </div>
    `;
  }

  document.getElementById('songsBox').innerHTML += html;
};
// Попробуйте добавить это в самый конец songs.js
setTimeout(() => {
    const box = document.getElementById('songsBox');
    if (box && !box.innerHTML.includes('ВИДЕОУРОКИ')) {
        renderSongs(); // Вызываем переопределенную версию
    }
}, 500);

