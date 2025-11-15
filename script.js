// DOMの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {
    
    // ゲームボードとスタートボタンの要素を取得
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    
    // 選択されたカードの情報を保持する配列
    let cardsChosen = [];       // 選択されたカードの名前
    let cardsChosenId = [];     // 選択されたカードのID
    let cardsWon = [];          // マッチしたカードのペア

    // カードの配列（各カードは2枚ずつ存在）
    const cardArray = [
        { name: 'card1', img: 'images/doraemon.png' },
        { name: 'card1', img: 'images/doraemon.png' },
        { name: 'card2', img: 'images/gojo.png' },
        { name: 'card2', img: 'images/gojo.png' },
        { name: 'card3', img: 'images/konan.png' },
        { name: 'card3', img: 'images/konan.png' },
        { name: 'card4', img: 'images/mario.png' },
        { name: 'card4', img: 'images/mario.png' },
        { name: 'card5', img: 'images/ruffy.png' },
        { name: 'card5', img: 'images/ruffy.png' },
    ];

    // 配列をシャッフルする関数
    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    // ゲームボードを作成する関数
    function createBoard() {
        shuffle(cardArray);  // カードをシャッフル
        grid.innerHTML = '';  // ゲームボードをクリア
        cardsWon = [];        // マッチしたカードをリセット

        // カードを生成してボードに配置
        // カードを生成してボードに配置
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');  // 最初は裏面を表示
            card.setAttribute('data-id', i);               // カードにIDを設定
            card.addEventListener('click', flipCard);       // クリックイベントを追加
            grid.appendChild(card);                         // ボードに追加
        }
    }

    // カードをめくる関数
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        // 同じカードを2回選択できないようにする
        // 同じカードを2回選択できないようにする
        
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);      // カード名を保存
            cardsChosenId.push(cardId);                     // カードIDを保存
            this.setAttribute('src', cardArray[cardId].img); // カードを表示
            // 2枚選択したらマッチチェック
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);  // 0.5秒後にチェック
            }
        }
    }

    // カードがマッチするかチェックする関数
    // カードがマッチするかチェックする関数
    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        // カードがマッチした場合（同じ名前で異なるカード）
        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';  // 1枚目を非表示
            cards[secondCardId].style.visibility = 'hidden'; // 2枚目を非表示
            cards[firstCardId].removeEventListener('click', flipCard);  // クリックイベント削除
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);  // マッチしたペアを保存
        } else {
            // マッチしなかった場合、カードを裏返す
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        // 選択をリセット
        cardsChosen = [];
        cardsChosenId = [];

        // 全てのペアが見つかったかチェック
        // 全てのペアが見つかったかチェック
        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    // スタートボタンにイベントリスナーを追加
    startButton.addEventListener('click', createBoard);
});
