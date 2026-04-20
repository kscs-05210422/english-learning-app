export interface ConversationOption {
  text: string;
  japanese: string;
  isCorrect: boolean;
  feedback: string;
}

export interface ConversationStep {
  id: string;
  teacherText: string;
  teacherJapanese: string;
  options: ConversationOption[];
}

export interface Conversation {
  id: string;
  title: string;
  scenario: string;
  emoji: string;
  steps: ConversationStep[];
}

export const conversations: Conversation[] = [
  {
    id: "conv1",
    title: "自己紹介",
    scenario: "初めて会った外国人の友達と話しています。",
    emoji: "👋",
    steps: [
      {
        id: "c1s1",
        teacherText: "Hi! My name is Sakura. What's your name?",
        teacherJapanese: "こんにちは！私はサクラです。あなたの名前は？",
        options: [
          { text: "My name is Yuki. Nice to meet you!", japanese: "私はユキです。よろしく！", isCorrect: true, feedback: "完璧！自然な自己紹介ができています！" },
          { text: "I am fine, thank you.", japanese: "元気です、ありがとう。", isCorrect: false, feedback: "名前を聞かれているので、自分の名前を答えてみよう！" },
          { text: "Yes, I do.", japanese: "はい、します。", isCorrect: false, feedback: "「What's your name?」は名前を聞く質問だよ。名前を答えてみて！" },
        ],
      },
      {
        id: "c1s2",
        teacherText: "Nice to meet you too, Yuki! Where are you from?",
        teacherJapanese: "こちらこそよろしく、ユキ！どこから来たの？",
        options: [
          { text: "I'm from Japan. I live in Tokyo.", japanese: "日本から来ました。東京に住んでいます。", isCorrect: true, feedback: "すばらしい！出身地を上手に伝えられています！" },
          { text: "I'm twelve years old.", japanese: "私は12歳です。", isCorrect: false, feedback: "「Where are you from?」は出身地を聞いているよ。「I'm from ~」で答えてみよう！" },
          { text: "I like music very much.", japanese: "音楽がとても好きです。", isCorrect: false, feedback: "どこから来たか聞いているよ。「I'm from Japan.」などと答えよう！" },
        ],
      },
      {
        id: "c1s3",
        teacherText: "Tokyo! That's cool! How old are you?",
        teacherJapanese: "東京！すごい！何歳ですか？",
        options: [
          { text: "I'm thirteen years old.", japanese: "私は13歳です。", isCorrect: true, feedback: "上手！年齢の言い方をマスターしています！" },
          { text: "I have two sisters.", japanese: "姉妹が2人います。", isCorrect: false, feedback: "年齢を聞かれているよ。「I'm ~ years old.」で答えてみよう！" },
          { text: "My birthday is March.", japanese: "誕生日は3月です。", isCorrect: false, feedback: "何歳か聞かれているよ。「I'm thirteen.」のように答えよう！" },
        ],
      },
      {
        id: "c1s4",
        teacherText: "I'm thirteen too! Do you have any hobbies?",
        teacherJapanese: "私も13歳！趣味はある？",
        options: [
          { text: "Yes, I like playing soccer and reading books.", japanese: "はい、サッカーと読書が好きです。", isCorrect: true, feedback: "とても自然な答えです！趣味の伝え方がバッチリ！" },
          { text: "No, I don't have a dog.", japanese: "いいえ、犬は飼っていません。", isCorrect: false, feedback: "趣味を聞かれているよ。「I like ~ing」で趣味を伝えてみよう！" },
          { text: "I go to school by bus.", japanese: "バスで学校に行きます。", isCorrect: false, feedback: "「hobbies」は趣味のこと。「I like ~」で答えてみよう！" },
        ],
      },
      {
        id: "c1s5",
        teacherText: "That sounds fun! Let's be friends!",
        teacherJapanese: "楽しそう！友達になりましょう！",
        options: [
          { text: "Sure! I'm glad to hear that!", japanese: "もちろん！うれしいです！", isCorrect: true, feedback: "完璧！会話を自然に締めくくれています！すばらしい！" },
          { text: "Sorry, I'm busy.", japanese: "ごめんなさい、忙しいです。", isCorrect: false, feedback: "友達になろうと言われているよ。「Sure!」や「Of course!」で答えてみよう！" },
          { text: "I don't understand.", japanese: "わかりません。", isCorrect: false, feedback: "友達になろうという誘いだよ。「Sure! 」と答えてみよう！" },
        ],
      },
    ],
  },
  {
    id: "conv2",
    title: "道を尋ねる",
    scenario: "外国人旅行者に道を聞かれました。",
    emoji: "🗺️",
    steps: [
      {
        id: "c2s1",
        teacherText: "Excuse me. Do you speak English?",
        teacherJapanese: "すみません。英語を話しますか？",
        options: [
          { text: "Yes, a little. Can I help you?", japanese: "はい、少し。何かお手伝いできますか？", isCorrect: true, feedback: "ナイス！「a little（少し）」を使って謙虚に答えられています！" },
          { text: "No, I'm a student.", japanese: "いいえ、私は学生です。", isCorrect: false, feedback: "英語を話せるか聞かれているよ。「Yes, a little.」と答えてみよう！" },
          { text: "I'm going to school.", japanese: "学校に行くところです。", isCorrect: false, feedback: "英語が話せるか聞かれているよ。「Yes, a little. Can I help you?」と答えよう！" },
        ],
      },
      {
        id: "c2s2",
        teacherText: "Great! How can I get to the nearest station?",
        teacherJapanese: "ありがとう！一番近い駅に行くにはどうすればいいですか？",
        options: [
          { text: "Go straight and turn left at the traffic light.", japanese: "まっすぐ行って、信号で左に曲がってください。", isCorrect: true, feedback: "すごい！道案内の基本フレーズが使えています！" },
          { text: "The station is very beautiful.", japanese: "駅はとても美しいです。", isCorrect: false, feedback: "道を教えてあげよう。「Go straight and turn ~」のように案内してみよう！" },
          { text: "I like trains very much.", japanese: "電車がとても好きです。", isCorrect: false, feedback: "どうやって駅に行くか教えてあげよう！「Go straight」から始めてみよう！" },
        ],
      },
      {
        id: "c2s3",
        teacherText: "I see. How far is it from here?",
        teacherJapanese: "なるほど。ここからどのくらいの距離ですか？",
        options: [
          { text: "It's about five minutes on foot.", japanese: "歩いて約5分です。", isCorrect: true, feedback: "完璧！距離の伝え方がとても上手！" },
          { text: "It's very expensive.", japanese: "とても高いです。", isCorrect: false, feedback: "距離や時間を聞かれているよ。「It's about ~ minutes on foot.」で答えてみよう！" },
          { text: "The train comes at nine.", japanese: "電車は9時に来ます。", isCorrect: false, feedback: "どのくらいの距離か聞かれているよ。「It's about five minutes.」と答えよう！" },
        ],
      },
      {
        id: "c2s4",
        teacherText: "Thank you so much! You're very helpful.",
        teacherJapanese: "ありがとうございます！とても助かりました。",
        options: [
          { text: "You're welcome! Have a good trip!", japanese: "どういたしまして！良い旅を！", isCorrect: true, feedback: "すばらしい！感謝への返し方と別れの挨拶が完璧です！" },
          { text: "Yes, I am.", japanese: "はい、そうです。", isCorrect: false, feedback: "お礼を言われているよ。「You're welcome!」と返してみよう！" },
          { text: "I don't know.", japanese: "わかりません。", isCorrect: false, feedback: "感謝されているよ。「You're welcome!」と自信を持って答えよう！" },
        ],
      },
      {
        id: "c2s5",
        teacherText: "By the way, is there a convenience store nearby?",
        teacherJapanese: "ところで、近くにコンビニはありますか？",
        options: [
          { text: "Yes, there's one right around the corner.", japanese: "はい、角を曲がったところにあります。", isCorrect: true, feedback: "パーフェクト！「there's one」という自然な表現が使えています！" },
          { text: "I have a convenience store.", japanese: "私はコンビニを持っています。", isCorrect: false, feedback: "近くにコンビニがあるか聞かれているよ。「Yes, there's one ~」と答えてみよう！" },
          { text: "Convenience stores are open late.", japanese: "コンビニは遅くまで開いています。", isCorrect: false, feedback: "近くにあるか聞かれているよ。「Yes, there's one right around the corner.」と答えよう！" },
        ],
      },
    ],
  },
  {
    id: "conv3",
    title: "レストランで注文",
    scenario: "外国のレストランでサクラ先生（ウェイター役）と話しています。",
    emoji: "🍽️",
    steps: [
      {
        id: "c3s1",
        teacherText: "Good evening! Welcome to Sakura Restaurant. Do you have a reservation?",
        teacherJapanese: "こんばんは！サクラレストランへようこそ。予約はしていますか？",
        options: [
          { text: "No, we don't. Is there a table for two?", japanese: "いいえ。2人席はありますか？", isCorrect: true, feedback: "自然な会話！予約なしの場合の言い方がバッチリ！" },
          { text: "Yes, I want spaghetti.", japanese: "はい、スパゲッティがほしいです。", isCorrect: false, feedback: "予約があるか聞かれているよ。「No, we don't. Is there a table?」と答えてみよう！" },
          { text: "This restaurant is very nice.", japanese: "このレストランはとても素敵です。", isCorrect: false, feedback: "予約の有無を答えてみよう。「No, we don't.」から始めてみて！" },
        ],
      },
      {
        id: "c3s2",
        teacherText: "Of course! Here's the menu. Are you ready to order?",
        teacherJapanese: "もちろんです！こちらがメニューです。ご注文はお決まりですか？",
        options: [
          { text: "Yes, I'd like the grilled chicken, please.", japanese: "はい、グリルチキンをお願いします。", isCorrect: true, feedback: "すごい！「I'd like ~」は丁寧な注文の仕方で、レストランで大活躍！" },
          { text: "I want to go home.", japanese: "家に帰りたいです。", isCorrect: false, feedback: "注文を聞かれているよ。「I'd like ~, please.」で注文してみよう！" },
          { text: "The menu is very long.", japanese: "メニューはとても長いです。", isCorrect: false, feedback: "何を注文するか伝えよう。「I'd like the ~, please.」と言ってみよう！" },
        ],
      },
      {
        id: "c3s3",
        teacherText: "Great choice! And what would you like to drink?",
        teacherJapanese: "良い選択ですね！お飲み物は何になさいますか？",
        options: [
          { text: "I'll have orange juice, please.", japanese: "オレンジジュースをください。", isCorrect: true, feedback: "ナイス！「I'll have ~」も注文でよく使う自然な表現です！" },
          { text: "I don't like vegetables.", japanese: "野菜が好きではありません。", isCorrect: false, feedback: "飲み物を聞かれているよ。「I'll have ~, please.」で答えてみよう！" },
          { text: "The weather is hot today.", japanese: "今日は暑いです。", isCorrect: false, feedback: "飲み物を選んで伝えよう。「I'll have orange juice, please.」のように答えよう！" },
        ],
      },
      {
        id: "c3s4",
        teacherText: "Here is your meal. Enjoy! Is everything okay?",
        teacherJapanese: "お食事をどうぞ。ご満足いただけていますか？",
        options: [
          { text: "Yes, everything is delicious! Thank you.", japanese: "はい、全部おいしいです！ありがとう。", isCorrect: true, feedback: "完璧！食事を楽しみながら自然に感謝を伝えられています！" },
          { text: "No, I want more homework.", japanese: "いいえ、もっと宿題がほしいです。", isCorrect: false, feedback: "食事のことを聞かれているよ。「Yes, everything is delicious!」と答えてみよう！" },
          { text: "I need a doctor.", japanese: "医者が必要です。", isCorrect: false, feedback: "食事が大丈夫か聞かれているよ。「Yes, everything is delicious!」と答えよう！" },
        ],
      },
      {
        id: "c3s5",
        teacherText: "I'm glad! Can I get you anything else?",
        teacherJapanese: "よかった！他に何かお持ちしますか？",
        options: [
          { text: "No, thank you. Could we have the bill, please?", japanese: "いいえ、結構です。お会計をお願いできますか？", isCorrect: true, feedback: "すばらしい！会計の頼み方も完璧です！" },
          { text: "Yes, I want to study more.", japanese: "はい、もっと勉強したいです。", isCorrect: false, feedback: "会計を頼んでみよう。「Could we have the bill, please?」と言ってみて！" },
          { text: "I like this restaurant.", japanese: "このレストランが好きです。", isCorrect: false, feedback: "お会計をお願いしよう。「Could we have the bill, please?」と伝えてみよう！" },
        ],
      },
    ],
  },
  {
    id: "conv4",
    title: "学校で友達と話す",
    scenario: "休み時間にサクラ先生（クラスメート役）と話しています。",
    emoji: "🏫",
    steps: [
      {
        id: "c4s1",
        teacherText: "Hey! Did you finish the math homework?",
        teacherJapanese: "ねえ！数学の宿題終わった？",
        options: [
          { text: "Yes, I did! It was really hard though.", japanese: "うん、終わったよ！でもすごく難しかった。", isCorrect: true, feedback: "ナイス！「though（でも）」を使った自然な会話！" },
          { text: "My favorite subject is music.", japanese: "好きな科目は音楽です。", isCorrect: false, feedback: "宿題が終わったか聞かれているよ。「Yes, I did!」か「No, not yet.」で答えてみよう！" },
          { text: "The teacher is very kind.", japanese: "先生はとても親切です。", isCorrect: false, feedback: "宿題のことを聞かれているよ。「Yes, I did!」か「No, not yet.」と答えよう！" },
        ],
      },
      {
        id: "c4s2",
        teacherText: "Me too! What did you do after school yesterday?",
        teacherJapanese: "私も！昨日の放課後、何してた？",
        options: [
          { text: "I went to soccer practice with my team.", japanese: "チームとサッカーの練習に行ったよ。", isCorrect: true, feedback: "上手！過去形「went」を使って昨日の出来事を伝えられています！" },
          { text: "I will go shopping tomorrow.", japanese: "明日ショッピングに行きます。", isCorrect: false, feedback: "昨日のことを聞かれているよ。過去形「I went to ~」を使って答えてみよう！" },
          { text: "I am going to the park now.", japanese: "今公園に行くところです。", isCorrect: false, feedback: "「yesterday（昨日）」のことだよ。「I went to ~」と答えてみよう！" },
        ],
      },
      {
        id: "c4s3",
        teacherText: "Cool! Are you free this weekend? Want to hang out?",
        teacherJapanese: "かっこいい！今週末、暇？一緒に遊ばない？",
        options: [
          { text: "Sure! What do you want to do?", japanese: "もちろん！何をしたい？", isCorrect: true, feedback: "完璧！友達の誘いに自然に答えられています！" },
          { text: "I don't like weekends.", japanese: "週末は好きではありません。", isCorrect: false, feedback: "遊びに誘われているよ。「Sure!」か「Sorry, I'm busy.」で答えてみよう！" },
          { text: "My weekend is on Saturday.", japanese: "私の週末は土曜日です。", isCorrect: false, feedback: "遊ぼうと誘われているよ。「Sure! What do you want to do?」と答えてみよう！" },
        ],
      },
      {
        id: "c4s4",
        teacherText: "How about going to the movies? There's a new action film!",
        teacherJapanese: "映画はどう？新しいアクション映画があるよ！",
        options: [
          { text: "That sounds great! What time does it start?", japanese: "いいね！何時に始まるの？", isCorrect: true, feedback: "すばらしい！「That sounds great!」は誘いを受けるときの定番フレーズ！" },
          { text: "I don't watch TV.", japanese: "テレビは見ません。", isCorrect: false, feedback: "映画に誘われているよ。「That sounds great!」か「Sorry, I don't like action films.」と答えよう！" },
          { text: "Films are from America.", japanese: "映画はアメリカから来ています。", isCorrect: false, feedback: "映画に誘われているよ。「That sounds great! What time?」と答えてみよう！" },
        ],
      },
      {
        id: "c4s5",
        teacherText: "It starts at three. Let's meet at the cinema at two-thirty!",
        teacherJapanese: "3時に始まるよ。2時半に映画館で会おう！",
        options: [
          { text: "Sounds good! See you then!", japanese: "いいね！じゃあそのときに！", isCorrect: true, feedback: "パーフェクト！約束をうまく締めくくれています！" },
          { text: "Three is my lucky number.", japanese: "3は私のラッキーナンバーです。", isCorrect: false, feedback: "約束ができたね。「Sounds good! See you then!」と答えてみよう！" },
          { text: "I live near the cinema.", japanese: "映画館の近くに住んでいます。", isCorrect: false, feedback: "待ち合わせの約束をしているよ。「Sounds good! See you then!」と答えよう！" },
        ],
      },
    ],
  },
  {
    id: "conv5",
    title: "電話での会話",
    scenario: "友達の家に電話をかけました。サクラ先生が友達の親として出ました。",
    emoji: "📞",
    steps: [
      {
        id: "c5s1",
        teacherText: "Hello?",
        teacherJapanese: "もしもし？",
        options: [
          { text: "Hello! May I speak to Hana, please?", japanese: "もしもし！ハナさんをお願いできますか？", isCorrect: true, feedback: "完璧！電話で人を呼び出す丁寧な言い方ができています！" },
          { text: "Hello! I want to eat dinner.", japanese: "もしもし！夕食を食べたいです。", isCorrect: false, feedback: "電話で友達を呼び出してみよう。「May I speak to ~, please?」と言ってみて！" },
          { text: "Hello! What time is it?", japanese: "もしもし！何時ですか？", isCorrect: false, feedback: "「May I speak to Hana, please?」でハナさんを呼んでもらおう！" },
        ],
      },
      {
        id: "c5s2",
        teacherText: "Sure! Who's calling, please?",
        teacherJapanese: "もちろん！どちら様ですか？",
        options: [
          { text: "This is Yuki speaking.", japanese: "ユキと申します。", isCorrect: true, feedback: "ナイス！「This is ~ speaking.」は電話で名前を伝える定番の言い方！" },
          { text: "I am calling from Japan.", japanese: "日本から電話しています。", isCorrect: false, feedback: "名前を聞かれているよ。「This is ~ speaking.」と名前を伝えてみよう！" },
          { text: "I don't know.", japanese: "わかりません。", isCorrect: false, feedback: "あなたの名前を教えよう！「This is Yuki speaking.」のように言ってみよう！" },
        ],
      },
      {
        id: "c5s3",
        teacherText: "Hold on, please. I'll get her for you.",
        teacherJapanese: "少々お待ちください。呼んできます。",
        options: [
          { text: "Thank you very much.", japanese: "ありがとうございます。", isCorrect: true, feedback: "上手！待ってもらうときの返し方がスムーズです！" },
          { text: "No, that's wrong.", japanese: "いいえ、それは間違いです。", isCorrect: false, feedback: "呼んでもらえるって言われているよ。「Thank you very much.」と答えよう！" },
          { text: "I don't want to wait.", japanese: "待ちたくないです。", isCorrect: false, feedback: "感謝を伝えよう。「Thank you very much.」と答えてみよう！" },
        ],
      },
      {
        id: "c5s4",
        teacherText: "Sorry, Hana is out right now. Can I take a message?",
        teacherJapanese: "すみません、ハナは今外出中です。伝言を預かりましょうか？",
        options: [
          { text: "Yes, please. Could you tell her to call me back?", japanese: "はい、お願いします。折り返し電話するよう伝えてもらえますか？", isCorrect: true, feedback: "すばらしい！伝言の頼み方がとても丁寧でナイス！" },
          { text: "Okay, goodbye forever.", japanese: "わかりました、永遠にさようなら。", isCorrect: false, feedback: "折り返し連絡をお願いしてみよう。「Could you tell her to call me back?」と言ってみよう！" },
          { text: "I will come to her house.", japanese: "彼女の家に行きます。", isCorrect: false, feedback: "折り返し電話をお願いしよう。「Could you tell her to call me back?」と伝えてみよう！" },
        ],
      },
      {
        id: "c5s5",
        teacherText: "Of course! I'll let her know. Anything else?",
        teacherJapanese: "もちろん！伝えておきます。他にはありますか？",
        options: [
          { text: "No, that's all. Thank you so much!", japanese: "いいえ、それだけです。ありがとうございます！", isCorrect: true, feedback: "完璧！電話の会話を上手に締めくくれました！" },
          { text: "Yes, I want pizza.", japanese: "はい、ピザがほしいです。", isCorrect: false, feedback: "「No, that's all.」で電話を丁寧に終わらせよう！" },
          { text: "Can you speak louder?", japanese: "もっと大きく話してもらえますか？", isCorrect: false, feedback: "会話を終わらせよう。「No, that's all. Thank you so much!」と言ってみよう！" },
        ],
      },
    ],
  },
];
