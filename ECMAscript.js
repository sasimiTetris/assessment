"use strict"
//constの場合はletと違い変数を再代入することのできない変数で（後から値を変更できない)、定数というのを宣言します。（constは英単語constantに由来する)
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");
assessmentButton.onclick = ()=>{
    const userName = userNameInput.value;
    if(userName.length === 0){
        // 名前が空の時は処理を終了する(return;は戻り値なしにそこで処理を終了するという意味)
        return;
    }
    console.log(userName);
    resultDivided.innerText = "";
    const header = document.createElement("h3");
    header.innerText = "診断結果";
    resultDivided.appendChild(header);

    const paragraph = document.createElement("p");
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    tweetDivided.innerText = "";
    const anchor = document.createElement("a");
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent("あなたのいいところ")+'&ref_src=twsrc%5Etfw';
    anchor.setAttribute("href",hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute("data-text",result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    const script = document.createElement("script");
    script.setAttribute("src","https://platform.twitter.com/widgets.js");
    tweetDivided.appendChild(script);
    
}


const answers = [
    "{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。",
    "{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。",
    "{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。",
    "{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。",
    "{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。",
    "{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。",
    "{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。",
    "{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。",
    "{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。",
    "{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。",
    "{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。",
    "{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。",
    "{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。",
    "{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。",
    "{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。",
    "{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。"
];
//下記のコメントはJSDocという形式のコメント。インターフェース(関数の内部の処理や外部からの入力、外部への出力の「内外の境界」)を表していてプログラムの可読性が上がり、その他にも機能があるなどのメリットがありとても便利
/**
 * 名前の文字列を渡すのと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @returns {string}診断結果
 */
function assessment(userName){
//1.名前の全ての文字のコード番号の整数値を足す
    let sumOFCharCode = 0;
    for (let i = 0; i<userName.length; i++){
        sumOFCharCode += userName.charCodeAt(i);
    }
//1.足した結果を、診断結果のパターンの数(上の定数answersのlength)で割った余りを取得する
    const index = sumOFCharCode % answers.length;
//2.余りを診断結果の配列の添え字として、診断結果の文字列を取得する
    let result = answers[index];
//3。診断結果の{userName}の部分を引数userNameに書き換える
    result = result.replaceAll("{userName}",userName);
    return result;
}
//テキストフィールドでenterキーが押された場合にも診断するようにする
userNameInput.onkeydown =  event =>  {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

