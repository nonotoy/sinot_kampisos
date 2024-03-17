// 外部ファイルの読み込み
import sections from './sections.js';
import commands from './commands.js';

// 正解・不正解用画像
const CORRECT_IMAGE_PATH = "materials/esaman_correct.png";
const INCORRECT_IMAGE_PATH = "materials/esaman_incorrect.png";

// 正解数のカウント
let correctCountACT02 = 0;
let correctCountACT03 = 0;

// mainBlockの高さと幅を取得
var mainBlockHeight = 0;
var mainBlockWidth = 0;

// 文字表記_初期値
let char_type = 'kana';

// セクションの表示・非表示を切り替える
window.showSection = function(sectionId) {
    const allSections = document.querySelectorAll('.section');
    const controls = document.getElementById("controls");
    const tips = document.querySelectorAll('.tip');

    allSections.forEach(section => {
        if (section.id === sectionId) {
            if (section.id === 'ACT02_library') {
                section.style.display = 'grid';
            } else {
                section.style.display = 'block'; // 指定されたセクションを表示
            }

            if (section.id.includes('ACT03_10_')) {

                // Get the element with the specific class
                const element = section.querySelector('.quiz_options_height');

                // Get the bounding rectangle of the element
                const rect = element.getBoundingClientRect();

                // Get the x and y coordinates
                mainBlockHeight = rect.top;
                mainBlockWidth = rect.left;
            }

            // 背景色を設定
            const sectionData = sections.find(s => s.id === sectionId);
            if (sectionData && sectionData.backgroundColor) {
                document.body.style.backgroundColor = sectionData.backgroundColor;
            } else {
                document.body.style.backgroundColor = ''; // デフォルト
            }

            // すべてのtipsを一度非表示にする
            ['.topTipText', '.bottomTipText', '.leftTipText', '.rightTipText', '.button_description-tips'].forEach(className => {
                section.querySelectorAll(className).forEach(tip => {
                    tip.style.display = 'none';
                });
            });

        } else {
            section.style.display = 'none'; // 他のセクションを非表示にする
        }
    });
}

window.defineLevel = function(level) {
    console.log('Level:', level);
}

// ランダムなクイズを生成
const randomQuizzes_ACT02 = generateRandomQuizzes('ACT02a', 11, 5, 3);
const randomQuizzes_ACT03_09 = generateRandomQuizzes('ACT03_09', 199, 5, 8);
const randomQuizzes_ACT03_10 = generateRandomQuizzes('ACT03_10', 9, 5, 30);

// 選択肢をシャッフルするための関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ランダムなクイズを生成
function generateRandomQuizzes(baseId, totalQuizzes, numberOfQuizzes, numberOfOptions) {
    const selectedIds = new Set();
    const endIDclass = {
        'ACT02a': 'ACT02_end',
        'ACT03_09': 'ACT03_defeated_01',
        'ACT03_10': 'ACT03_defeated_01',
    };

    // 生成されたランダムな数字を3桁の文字列で0埋めする
    while (selectedIds.size < numberOfQuizzes) {
      const quizNumber = (Math.floor(Math.random() * totalQuizzes)).toString().padStart(3, '0');
      selectedIds.add(`${baseId}_${quizNumber}`);
    }
  
    return Array.from(selectedIds).map((id, index, array) => {
      const options = Array.from({ length: numberOfOptions }).map((_, optionIndex) => ({
        id: `option${optionIndex + 1}`,
        descKey: `${id}_op${optionIndex + 1}`
      }));
  
      // オプションをランダムに並び替える
      shuffleArray(options);
  
      return {
        id,
        section_class: '5_quiz',
        texts: [{ type: 'topText', key: `${id}_quiz` }],
        options,
        next: index < array.length - 1 ? array[index + 1] : `${endIDclass[baseId]}`,
      };
    });    
}

// 指定されたセクション内で、指定されたoptionIdを持つボタンを探す
function updateQuizSections(sectionId, firstQuizId, optionId) {

    const button_container_class = {
        'ACT02_home': '.button-container-vertical',
        'ACT03_09': '.button-container-horizontal',
        'ACT03_10': '.button-container-horizontal',
    };
    const optionElement = document.querySelector(`#${sectionId} ${button_container_class[sectionId]} #${optionId}`);

    if (optionElement) {
        // onclick属性を更新して、指定されたfirstQuizIdを使用するようにする
        optionElement.setAttribute('onclick', `showSection('${firstQuizId}')`);
    } else {
        console.error('Option not found:', optionId, 'in section:', sectionId);
    }
}

function randomizeButtons(sectionElement) {
    // 一時的にセクションのvisibilityをvisibleに設定
    const originalVisibility = sectionElement.style.visibility;
    sectionElement.style.visibility = 'visible';

    // 'target-container'クラスを持つ要素を検索
    const targetContainer = sectionElement.querySelector('.quiz_options_height');
    if (!targetContainer) {
        console.error('Target container not found!');
        return;
    }

    // targetContainerの座標とサイズを取得
    const containerRect = targetContainer.getBoundingClientRect();

    const buttons = sectionElement.querySelectorAll('button');

    // console.log('containerRect.left',containerRect.left)

    buttons.forEach(button => {

        // ボタンのサイズ（ここでは仮の値を使用）
        const buttonWidth = 100; // 仮の値
        const buttonHeight = 100; // 仮の値

        // targetContainerのサイズに基づいてランダムな位置を生成
        const x = Math.random() * (mainBlockWidth - buttonWidth);
        const y = Math.random() * (mainBlockHeight - buttonHeight);

        // ボタンにスタイルを適用
        button.style.position = 'absolute';
        button.style.left = `${x + containerRect.left}px`; // containerRect.leftを加算して親要素内の相対位置を調整
        button.style.top = `${y + containerRect.top}px`; // containerRect.topを加算して親要素内の相対位置を調整
    });

    // 元のvisibilityに戻す
    sectionElement.style.visibility = originalVisibility;
}

// HTMLに変換してDOMに挿入する関数
function renderQuizzes(quizzes) {
    // mainBlock要素を選択
    const mainBlock = document.getElementById('mainBlock');
    if (!mainBlock) {
        console.error('mainBlock element not found!');
        return; // mainBlock要素が見つからない場合はここで処理を停止
    }

    // クイズデータを基にHTMLを組み立てる
    quizzes.forEach(quiz => {
        
        // クイズセクションのコンテナを作成
        const sectionElement = document.createElement('div');
        sectionElement.id = quiz.id;
        sectionElement.className = 'section quiz-section';
        sectionElement.style.display = 'none';

        // 問題文を含む要素を作成
        const questionElement = document.createElement('div');

        questionElement.className = 'question';
        
        const topTextElement = document.createElement('div');
        topTextElement.className = 'topText';
        topTextElement.setAttribute('data-key', `${quiz.id}_quiz`);

        const questionText = commands[quiz.texts[0].key];
        topTextElement.innerHTML = `<p>${questionText}</p>`; 

        questionElement.appendChild(topTextElement);

        // 選択肢のコンテナを作成
        const optionsElement = document.createElement('div');

        // quiz.idにACT03が含まれる場合
        if (quiz.id.includes('ACT03_09')) {
            optionsElement.className = 'quiz_options_height options_8questions';
        } else if (quiz.id.includes('ACT03_10')) {
            optionsElement.className = 'quiz_options_height';
        } else {
            optionsElement.className = 'options';
        }

        // 選択肢を含む要素を作成
        quiz.options.forEach(option => {
            const button = document.createElement('button');
            button.id = option.id;

            const optionTextElement = document.createElement('div');
            optionTextElement.className = 'option-text';
            optionTextElement.setAttribute('data-key', option.descKey); 
            
            const optionText = commands['kana'][String(option.descKey)];


            if (quiz.id.includes('ACT03_09')) {
                button.className = 'quiz-option_8questions' ;
                button.setAttribute('onclick', `checkACT03Answer('${quiz.id}', '${option.id}')`);
                optionTextElement.innerHTML = `<p>${optionText}</p>`;
            } else if (quiz.id.includes('ACT03_10')) {
                button.className = 'random_quiz-option' ;
                button.setAttribute('onclick', `checkACT03_10Answer('${quiz.id}', '${option.id}')`);
                optionTextElement.innerHTML = `<p class='p_no_margin'>${optionText}</p>`;
            } else {
                button.className = 'quiz-option';
                button.setAttribute('onclick', `checkACT02Answer('${quiz.id}', '${option.id}')`);
                optionTextElement.innerHTML = `<p>${optionText}</p>`;
            };

            // if button.descKey contains op1, add answer: true
            if (option.descKey.endsWith('op1')) {
                option.answer = true;
            } else {
                option.answer = false;
            }

            button.appendChild(optionTextElement);
            optionsElement.appendChild(button);
        });

        // クイズセクションをmainBlockに追加
        sectionElement.appendChild(questionElement);
        sectionElement.appendChild(optionsElement);
        mainBlock.appendChild(sectionElement);

        if (quiz.id.includes('ACT03_10')) {
            randomizeButtons(sectionElement);
        }
    });
}

function generateAndUpdateRandomQuizzes() {

    updateQuizSections('ACT02_home', randomQuizzes_ACT02[0].id, 'option1');
    updateQuizSections('ACT03_09', randomQuizzes_ACT03_09[0].id, 'option2');
    updateQuizSections('ACT03_10', randomQuizzes_ACT03_10[0].id, 'option1');

    // HTMLに変換してDOMに挿入する関数
    renderQuizzes(randomQuizzes_ACT02);
    renderQuizzes(randomQuizzes_ACT03_09);
    renderQuizzes(randomQuizzes_ACT03_10);
}


// クイズの正解・不正解を判定
window.checkAnswer = function(sectionId, optionId) {

    const quizArray = sectionId.startsWith('ACT02') ? randomQuizzes_ACT02 :
                      sectionId.startsWith('ACT03_09') ? randomQuizzes_ACT03_09 :
                      randomQuizzes_ACT03_10;
                      
    const section = quizArray.find(quiz => quiz.id === sectionId);
    const option = section.options.find(option => option.id === optionId);
    const answer = option.answer;

    if (answer) {
        // 正解の場合
        displayImage(CORRECT_IMAGE_PATH, section.next, 'rgba(255, 0, 0, 0.2)');
        window[sectionId.includes('ACT02') ? 'correctCountACT02' : 'correctCountACT03']++;
    } else {
        // 不正解の場合
        displayImage(INCORRECT_IMAGE_PATH, section.next, 'rgba(0, 123, 255, 0.2)');
    }
}

window.checkACT02Answer = function(sectionId, optionId) {

    const section = randomQuizzes_ACT02.find(quiz => quiz.id === sectionId);
    const option = section.options.find(option => option.id === optionId);
    const answer = option.answer;

    if (answer) {
        // 正解の場合
        displayImage(CORRECT_IMAGE_PATH, section.next, 'rgba(255, 0, 0, 0.2)');
        correctCountACT02++;
    } else {
        // 不正解の場合
        displayImage(INCORRECT_IMAGE_PATH, section.next, 'rgba(0, 123, 255, 0.2)');
    }

    console.log('Correct count:', correctCountACT02);
}

window.checkACT03Answer = function(sectionId, optionId) {

    const section = randomQuizzes_ACT03_09.find(quiz => quiz.id === sectionId);
    const option = section.options.find(option => option.id === optionId);
    const answer = option.answer;

    if (answer) {
        // 正解の場合
        displayImage(CORRECT_IMAGE_PATH, section.next, 'rgba(255, 0, 0, 0.2)');
        correctCountACT03++;
    } else {
        // 不正解の場合
        displayImage(INCORRECT_IMAGE_PATH, section.next, 'rgba(0, 123, 255, 0.2)');
    }

    console.log('Correct count:', correctCountACT03);
}

window.checkACT03_10Answer = function(sectionId, optionId) {

    const section = randomQuizzes_ACT03_10.find(quiz => quiz.id === sectionId);
    const option = section.options.find(option => option.id === optionId);
    const answer = option.answer;

    if (answer) {
        // 正解の場合
        displayImage(CORRECT_IMAGE_PATH, section.next, 'rgba(255, 0, 0, 0.2)');
        correctCountACT03++;
    } else {
        // 不正解の場合
        displayImage(INCORRECT_IMAGE_PATH, section.next, 'rgba(0, 123, 255, 0.2)');
    }

    console.log('Correct count:', correctCountACT03);
}


// 画像を表示し、次のセクションに移動する処理を行う関数
function displayImage(imagePath, nextSectionId, backgroundColor) {

    document.body.style.overflow = 'hidden';

    var imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    imageContainer.style.backgroundColor = backgroundColor;

    var image = document.createElement("img");
    image.src = imagePath;

    imageContainer.appendChild(image);
    document.body.appendChild(imageContainer);

    // 指定秒後に画像を自動的に消去する
    setTimeout(function() {

        document.body.removeChild(imageContainer);

        document.body.style.overflow = '';

        showSection(nextSectionId);
    }, 1500); // 1.5秒
}

// 完了' クイズ終了後に正解数に基づいてセクションを表示する関数
window.displayACT02SectionBasedOnCorrectCount = function() {
    const sectionMap = {
        4: 'ACT02_result_A', // 4以上の場合は'A'
        3: 'ACT02_result_B',
        2: 'ACT02_result_C',
    };
    const section = sectionMap[correctCountACT02] || 'ACT02_result_D'; // マップにない場合はデフォルトで'D'
    showSection(section);
};

// 完了' クイズ終了後に正解数に基づいてセクションを表示する関数
window.displayEndingBasedOnCorrectCount = function() {
    if (correctCountACT03 >= 4) {
        showSection('ACT03_defeated_02');
    } else if (correctCountACT03 >= 1) {
        showSection('bitter_end_01');
    } else {
        showSection('dead_end');
    }
};


function updateTextContent(elements, lang, commands) {
    elements.forEach((element) => {
        const key = element.getAttribute('data-key');

        if (element.classList.contains('button_description') || element.classList.contains('button_description-tips')) {
            element.textContent = commands[lang][key];
        } else if (element.classList.contains('topTipText') || element.classList.contains('bottomTipText') || element.classList.contains('leftTipText') || element.classList.contains('rightTipText')) {
            element.innerHTML = `<p class='p_no_margin'>${commands[lang][key]}</p>`;
        } else if (commands[lang][key]){
            element.innerHTML = `<p>${commands[lang][key]}</p>`;
        } 
    });
}

// Tipsの表示・非表示を切り替える
function toggleTips() {

    const classNames = ['.topTipText', '.bottomTipText', '.leftTipText', '.rightTipText', '.button_description-tips'];
    
    classNames.forEach(className => {
        const tips = document.querySelectorAll(className);
        if (tips) {
            tips.forEach(tip => {
                tip.style.display = tip.style.display === 'none' ? 'block' : 'none';
            });
        };
    });
};

// 文字表記を切り替える
function toggleChars() {
    let char_type_cur = char_type;

    char_type = char_type === 'kana' ? 'roman' : 'kana';
    updateAllTextContents(char_type)
};

document.getElementById('tips_button').addEventListener('click', toggleTips);
document.getElementById('char_button').addEventListener('click', toggleChars);


function doesButtonExist(buttonId) {
    const button = document.getElementById(buttonId);
    return button !== null; // ボタンが存在する場合は true、そうでない場合は false を返す
}

function setupTipsButton() {

    if (doesButtonExist('tips_button')) {
        const button = document.getElementById('tips_button');
        // イベントリスナーを追加する前に、以前に追加されたイベントリスナーを削除する
        button.removeEventListener('click', toggleTips);
        button.addEventListener('click', toggleTips);
    }

    if (doesButtonExist('char_button')) {
        const button = document.getElementById('char_button');
        // イベントリスナーを追加する前に、以前に追加されたイベントリスナーを削除する
        button.removeEventListener('click', toggleTips);
        button.addEventListener('click', toggleTips);
    }
}

document.addEventListener('click', function(e) {

    // クリックされた要素がセクション切り替えボタンかどうかをチェック
    if (e.target.closest('.section-switch')) {

        setupTipsButton();
        // ここにその他のセクション切り替えに関連する処理を追加
    }
});

// ローカルストレージにデータを保存
window.saveToLocal = function(data) {
    try {
        localStorage.setItem('myData', JSON.stringify(data));
        alert('Data successfully saved to local storage' + data);
    } catch (error) {
        alert('Error saving to local storage:');
    }
}

// 画像のHTMLを作成
function createImageHTML(section) {

    let imageHTML = '';

    // 画像
    for (const image of section.images) {
        if (image) {
            if (section.id === 'ACT02_home') {
                imageHTML += `
                    <div class="image">
                        <img src="${image.data}" alt="${section.id}" usemap="#ImageMap" class="${image.image_class}">
                        <map name="ImageMap">
                            <area shape="poly" coords="918,526,999,589,1002,679,939,767,893,758,833,679,836,590,836,590" id="area1" href="#" alt=""/>
                        </map>
                    </div>`;
            } else if (image.image_class.includes('background')) {
                imageHTML += `
                    <div class="background-image_class">
                        <img src="${image.data}" alt="${section.id}" class="${image.image_class}">
                    </div>`;
            } else {
                imageHTML += `
                    <div class="image">
                        <img src="${image.data}" alt="${section.id}" class="${image.image_class}">
                    </div>`;
            };
        }
    };

    return imageHTML;
}


// 選択肢ボタンのHTMLを作成
function createButtonHTML(section) {

    let buttonsHTML = '';
    let buttonsHTML_tmp = '';
    let buttonsLayoutHTML_tmp = '';

    // containerClassがquizの場合、クリック時に正解・不正解を判定
    if (section.section_class === '5_quiz') {

        // シャッフル前に選択肢を配列に格納
        const optionsArray = section.options.slice(); // 選択肢の配列をコピー
        shuffleArray(optionsArray); // 選択肢をシャッフル

        for (const option of optionsArray) { // シャッフルされた配列を使用
            buttonsHTML_tmp += `
                <button id="${option.id}" onclick="checkACT02Answer('${section.id}', '${option.id}')">
                    <div class="button_description" data-key="${option.descKey}"></div>
                    <div class="tip" data-key="${option.tipKey}"></div>
                </button>
            `;
        }

        buttonsLayoutHTML_tmp = "button-container";

        buttonsHTML = `<div class="${buttonsLayoutHTML_tmp}">${buttonsHTML_tmp}</div>`;

    // sectionIdがACT02_endである場合、正解数に基づいて次のセクションを表示
    } else if (section.id === 'ACT02_end') {

        for (const option of section.options) {
            buttonsHTML_tmp += `
                <button id="${option.id}" onclick="displayACT02SectionBasedOnCorrectCount()">
                    <div class="button_description" data-key="${option.descKey}"></div>
                    <div class="tip" data-key="${option.tipKey}"></div>
                </button>`;
        }

        buttonsLayoutHTML_tmp = "button-container-horizontal"

        buttonsHTML = `<div class="${buttonsLayoutHTML_tmp}">${buttonsHTML_tmp}</div>`;

    // sectionIdがACT03_defeated_01である場合、正解数に基づいて次のセクションを表示
    } else if (section.id === 'ACT03_defeated_01') {

        // 次へ進むボタンのHTMLを作成 || 基本的に次へ進むボタンは表示
        buttonsHTML_tmp += `
            <button id="next" onclick="displayEndingBasedOnCorrectCount()" class="next_button button_position_fixed">
                <div>次へ</div>
            </button>
        `;

        buttonsLayoutHTML_tmp = "button-container-horizontal"

        buttonsHTML = `<div class="${buttonsLayoutHTML_tmp}">${buttonsHTML_tmp}</div>`;


    } else if (section.id === 'level') {

        for (const option of section.options) {
            buttonsHTML_tmp += `
                <button id="${option.id}" onclick="showSection('${option.nextSection}'); defineLevel('${option.id}')" class="section-switch">
                    <div class="button_description" data-key="${option.descKey}"></div>
                </button>
            `;
        };
        buttonsLayoutHTML_tmp = "level-button-container"

        buttonsHTML = `<div class="${buttonsLayoutHTML_tmp}">${buttonsHTML_tmp}</div>`;


    // containerClassがquiz以外で、選択肢がある場合は選択肢分のボタンを表示
    } else if (section.options && section.options.length > 0) {

        for (const option of section.options) {
            buttonsHTML_tmp += `
                <button id="${option.id}" class="section-switch" onclick="showSection('${option.nextSection}')">
                    <div class="button_description" data-key="${option.descKey}"></div>
                    <div class="button_description-tips" data-key="${option.descKey}"></div>
                </button>
            `;
        };

        // 選択肢ボタンのレイアウトを決定
        if (section.id === 'ACT03_start') {
            buttonsLayoutHTML_tmp = "button-container-vertical-center"
        } else if (section.verticalLayout === true) {
            buttonsLayoutHTML_tmp = "button-container-vertical"
        } else {
            // Default
            buttonsLayoutHTML_tmp = "button-container-horizontal"
        };
        buttonsHTML = `<div class="${buttonsLayoutHTML_tmp}">${buttonsHTML_tmp}</div>`;

    // 選択肢がない場合は次へ、戻るボタンを表示
    } else {

        // 戻るボタンのHTMLを作成 || 一つ前に戻らせないフローの場合は戻るボタンを表示しない
        if (section.back) {
            buttonsHTML_tmp += `<button id="back" onclick="showSection('${section.back}')" class="back_button button_position_fixed section-switch"><div>戻る</div></button>`
        };

        // 次へ進むボタンのHTMLを作成 || 基本的に次へ進むボタンは表示
        buttonsHTML_tmp += `<button id="next" onclick="showSection('${section.next}')" class="next_button button_position_fixed section-switch"><div>次へ</div></button>`

        buttonsLayoutHTML_tmp = "button-container";
        buttonsHTML = `<div class="${buttonsLayoutHTML_tmp}">${buttonsHTML_tmp}</div>`;
    };


    return buttonsHTML;
}

// EventListener - 言語切り替え
function setupLanguageChangeListeners() {
    const languageButtons = document.getElementsByName('charACT01a_er');
    languageButtons.forEach((button) => {
        button.addEventListener('change', (event) => {
            updateDescription(event.target.value);
        });
    });
}

// EventListener - テキスト反映
function updateAllTextContents(lang) {
    updateTextContent(document.querySelectorAll('.description'), lang, commands);
    updateTextContent(document.querySelectorAll('.home_title'), lang, commands);
    updateTextContent(document.querySelectorAll('.home_subtitle'), lang, commands);
    updateTextContent(document.querySelectorAll('.textHTML'), lang, commands);
    updateTextContent(document.querySelectorAll('.topText'), lang, commands);
    updateTextContent(document.querySelectorAll('.bottomText'), lang, commands);
    updateTextContent(document.querySelectorAll('.leftText'), lang, commands);
    updateTextContent(document.querySelectorAll('.rightText'), lang, commands);
    updateTextContent(document.querySelectorAll('.button_description'), lang, commands);
    updateTextContent(document.querySelectorAll('.library_subtitle'), lang, commands);
    updateTextContent(document.querySelectorAll('.library_button'), lang, commands);

    const tip = 'tips';
    updateTextContent(document.querySelectorAll('.topTipText'), tip, commands)
    updateTextContent(document.querySelectorAll('.bottomTipText'), tip, commands);
    updateTextContent(document.querySelectorAll('.leftTipText'), tip, commands);
    updateTextContent(document.querySelectorAll('.rightTipText'), tip, commands);
    updateTextContent(document.querySelectorAll('.button_description-tips'), tip, commands);
}


// 言語切り替え機能を初期化する関数
function initializeLanguageSwitcher() {
    var languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        var selectedLanguage = languageSelect.value;
        // updateLanguage(selectedLanguage);
    });
}

// 選択された言語に基づいてページの言語を更新する関数
function updateLanguage(lang) {
    var greeting = document.getElementById('greeting');
    if (lang === 'ja') {
        greeting.textContent = 'こんにちは、世界！';
    } else if (lang === 'en') {
        greeting.textContent = 'Hello, World!';
    }
}


// 画面の読み込みが完了したら実行
// 確認 - 毎回Home画面に戻った時にクイズを生成し直すのであれば、EventListenerの登録を変更
document.addEventListener('DOMContentLoaded', () => {

    var myDiv = document.getElementById('mainBlock');
    if (myDiv) { // myDivが存在するか確認
        mainBlockHeight = myDiv.offsetHeight;
        mainBlockWidth = myDiv.offsetWidth;
    }
    
    window.addEventListener('resize', function() {
        if (myDiv) { // myDivが存在するか確認
            mainBlockHeight = myDiv.offsetHeight;
            mainBlockWidth = myDiv.offsetWidth;
        }
    });

    setupLanguageChangeListeners();
    generateAndUpdateRandomQuizzes();
    updateAllTextContents(char_type);

    const area1 = document.querySelector('#area1');
    if (area1) {
        area1.addEventListener('click', function(event) {
            event.preventDefault(); // デフォルトの動作を防ぐ
            showSection('0_home');
        });
    }
    setupTipsButton();
});


// HTMLコードを生成
function createSectionHTML(section) {

    let sectionHTML = '';
    let imageHTML = '';
    let textHTML = '';
    let desc = '';
    let buttonsHTML_tmp_1 = ''
    let buttonsHTML_tmp_2 = ''
    let buttonsHTML_tmp_3 = ''
    let img_src = '';

    // 0. メニュー
    if (section.section_class === '0_menu') {
        
        let title = ''; // タイトル
        let subtitle = ''; // サブタイトル
        let imageHTML = ''; // 画像データ

        // 画像
        for (const image of section.images) {
            if (image.data === 'materials/home_2.png') {
                imageHTML += `
                    <div class="home_image1">
                        <img src="${image.data}" alt="${section.id}" class="${image.image_class}">
                    </div>`;
            } else {
                imageHTML += `
                    <div class="image">
                        <img src="${image.data}" alt="${section.id}" class="${image.image_class}">
                    </div>`;     
            }
        }


        // メッセージ
        for (const text of section.texts) {
            
            if (text.type === 'title') {
                title = `<div class="home_title" data-key="${text.key}"></div>`;
            }

            if (text.type === 'subtitle') {
                subtitle = `<div class="home_subtitle" data-key="${text.key}"></div>`;
            }
        };

        let buttonsHTML = createButtonHTML(section);
          
        sectionHTML = `
        <div id="${section.id}" class="section">
            <div class="home-wrapper main-wrapper_height_80">
                ${title}
                ${subtitle}
                ${imageHTML}
            </div>
            ${buttonsHTML}
        </div>
        `;

    // 2. メッセージのみ
    } else if (section.section_class === '2_onlytext') {
        
        if (section.texts && section.texts.length > 0) {
            for (const msg of section.texts) {
                    desc += `<div class="${msg.type}" data-key="${msg.key}"></div>`;
                }
            textHTML = `<div class="description">${desc}</div>`;
        };

        let buttonsHTML = createButtonHTML(section);

        sectionHTML = `
                <div id="${section.id}" class="section">
                    ${textHTML}
                    ${buttonsHTML}
                </div>
            `;

    // 3. 左: 画像、右: テキスト
    } else if (section.section_class === '3_leftimg') {

        // 画像
        imageHTML = createImageHTML(section);
        
        if (section.texts && section.texts.length > 0) {
            for (const msg of section.texts) {
                    desc += `<div class="${msg.type}" data-key="${msg.key}"></div>`;
                }
            textHTML = `<div class="description">
                            ${desc}
                        </div>`;
        };

        // ボタン
        let buttonsHTML = createButtonHTML(section);

        sectionHTML = `
                <div id="${section.id}" class="section">
                    <div class="leftimg_twocolumns">
                        <div class="leftimg_leftcol">
                            ${imageHTML}
                        </div>
                        <div class="leftimg_rightcol">
                            ${textHTML}
                        </div>
                    </div>
                    ${buttonsHTML}
                </div>
            `;

    // 3. 左: 画像、右: テキスト
} else if (section.section_class === '4_rightimg') {

    // 画像
    imageHTML = createImageHTML(section);
    
    if (section.texts && section.texts.length > 0) {
        for (const msg of section.texts) {
                desc += `<div class="${msg.type}" data-key="${msg.key}"></div>`;
            }
        textHTML = `<div class="description">
                        ${desc}
                    </div>`;
    };

    // ボタン
    let buttonsHTML = createButtonHTML(section);

    sectionHTML = `
            <div id="${section.id}" class="section">
                <div class="rightimg_twocolumns">
                    <div class="rightimg_leftcol">
                        ${textHTML}
                    </div>
                    <div class="rightimg_rightcol">
                        ${imageHTML}
                    </div>
                </div>
                ${buttonsHTML}
            </div>
        `;


    // 5. クイズ (通常)
    } else if (section.section_class === '5_quiz') {

        // 画像
        // imageHTML = createImageHTML(section);

        // 問題文の設定
        let questionText = '';
        if (section.texts && section.texts.length > 0) {
            section.texts.forEach(text => {
                questionText += `<div class="${text.type}" data-key="${text.key}"></div>`;
            });
        }

        // 選択肢のHTMLを生成
        let optionsHTML = '';
        if (section.options && section.options.length > 0) {
            // 選択肢をシャッフル
            shuffleArray(section.options);

            // シャッフルされた選択肢でHTMLを生成
            section.options.forEach(option => {
                optionsHTML += `
                    <button class="quiz-option" id="${option.id}" onclick="checkACT02Answer('${section.id}', '${option.id}')">
                        <div class="option-text" data-key="${option.descKey}"></div>
                    </button>
                `;
            });
        }

        // 最終的なクイズセクションのHTMLを組み立て
        sectionHTML = `
            <div id="${section.id}" class="section quiz-section">
                <div class="question">${questionText}</div>
                <div class="options">${optionsHTML}</div>
            </div>
        `;

    // 6. クイズ (迷走時)
    } else if (section.section_class === '6_quiz_parallised') {

        // 問題文の設定
        let questionText = '';
        if (section.texts && section.texts.length > 0) {
            section.texts.forEach(text => {
                questionText += `<div class="${text.type}" data-key="${text.key}"></div>`;
            });
        }

        // 選択肢のHTMLを生成
        let optionsHTML = '';
        if (section.options && section.options.length > 0) {
            // 選択肢をシャッフル
            shuffleArray(section.options);

            // シャッフルされた選択肢でHTMLを生成
            section.options.forEach(option => {
                optionsHTML += `
                    <button class="quiz-option" id="${option.id}" onclick="checkACT03_10Answer('${section.id}', '${option.id}')">
                        <div class="option-text" data-key="${option.descKey}"></div>
                    </button>
                `;
            });
        }

        // 最終的なクイズセクションのHTMLを組み立て
        sectionHTML = `
            <div id="${section.id}" class="section quiz-section">
                <div class="question">${questionText}</div>
                <div class="options">${optionsHTML}</div>
            </div>
        `;

    } else if (section.section_class === 'library') {

        for (const text_ of section.texts) {
            if (text_.type.includes('genre1-')) {  
                buttonsHTML_tmp_1 += `<div class="library_subtitle" data-key="${text_.key}"></div>`;
            } else if (text_.type.includes('genre2-')){
                buttonsHTML_tmp_2 += `<div class="library_subtitle" data-key="${text_.key}"></div>`;
            } else {
                buttonsHTML_tmp_3 += `<div class="library_subtitle" data-key="${text_.key}"></div>`;
            };
        }

        for (const option of section.options) {
            // if option.id contains 'option1-' 
            if (option.id.includes('option1-')) {  
                img_src = 'materials/ACT02_lib_green.png' 
                buttonsHTML_tmp_1 += `
                    <div class="library_row">
                        <img src="${img_src}" alt="${section.id}" class="width_60">
                        <libbutton id="${option.id}" onclick="showSection('${option.nextSection}')">
                            <div class="library_button" data-key="${option.descKey}"></div>
                        </libbutton>
                    </div>`;
            } else if (option.id.includes('option2-')){
                img_src = 'materials/ACT02_lib_blue.png' 
                buttonsHTML_tmp_2 += `
                <div class="library_row">
                    <img src="${img_src}" alt="${section.id}" class="width_60">
                    <libbutton id="${option.id}" onclick="showSection('${option.nextSection}')">
                        <div class="library_button" data-key="${option.descKey}"></div>
                    </libbutton>
                </div>`;
            } else {
                img_src = 'materials/ACT02_lib_red.png' 
                buttonsHTML_tmp_3 += `
                <div class="library_row">
                    <img src="${img_src}" alt="${section.id}" class="width_60">
                    <libbutton id="${option.id}" onclick="showSection('${option.nextSection}')">
                        <div class="library_button" data-key="${option.descKey}"></div>
                    </libbutton>
                </div>`;
            }
        };

        sectionHTML = `
                <div id="${section.id}" class="library section">
                    <div class="library-column">${buttonsHTML_tmp_1}</div>
                    <div class="library-column">${buttonsHTML_tmp_2}</div>
                    <div class="library-column">${buttonsHTML_tmp_3}</div>
                </div>
            `;

    // Level
    } else if (section.section_class === 'level') {
        
        if (section.texts && section.texts.length > 0) {
            for (const msg of section.texts) {
                    desc += `<div class="${msg.type}" data-key="${msg.key}"></div>`;
                }
            textHTML = `<div class="main-wrapper">${desc}</div>`;
        };

        let buttonsHTML = createButtonHTML(section);

        sectionHTML = `
                <div id="${section.id}" class="section">
                    ${textHTML}
                    ${buttonsHTML}
                </div>
            `;
            
    // 1. 標準: 画像 (サイズは変数で変更化) (+ 上下左右メッセージ) 
    } else {

        // |           topText            |
        // |                              |
        // |--------- ---------- ---------|
        // |         |          |         |    
        // |    l    |   img    |    r    |
        // |         |          |         |    
        // |         |          |         |
        // |--------- ---------- ---------|
        // |                              |
        // |          bottomText          |

        let imageHTML = ''; // 画像データ
        let topText = ''; // 上メッセージ
        let bottomText = ''; // 下メッセージ
        let rightText = ''; // 右メッセージ
        let leftText = ''; // 左メッセージ

        // 画像
        imageHTML = createImageHTML(section)

        // メッセージ
        for (const text of section.texts) {
            if (text.type.includes('top')) {
                topText += `<div class="${text.type}" data-key="${text.key}"></div>`;
            }

            if (text.type.includes('bottom')) {
                bottomText += `<div class="${text.type}" data-key="${text.key}"></div>`;
            }

            if (text.type.includes('right')) {
                rightText += `<div class="${text.type}" data-key="${text.key}"></div>`;
            }

            if (text.type.includes('left')) {
                leftText += `<div class="${text.type}" data-key="${text.key}"></div>`;
            }
        };

        if (rightText === '') {
            rightText = `<div class="rightText"></div>`;
        }

        if (leftText === '') {
            leftText = `<div class="leftText"></div>`;
        }

        let buttonsHTML = createButtonHTML(section);

        // セーブボタンのHTMLを作成
        let savebuttonsHTML = "";

        const saveButton = document.getElementById('saveButton');
        //saveButton.innerHTML += `<button id="save" onclick="saveToLocal({score:${correctCountACT02}} class="save_button")">Save</button>`;
        //${savebuttonsHTML}

        const wrapperClasses = {
            'ACT03_start': 'main-wrapper main-wrapper_height_20',
            'default': 'main-wrapper main-wrapper_height_70',
        };
          
        sectionHTML = `
            <div id="${section.id}" class="section">
                <div class="${wrapperClasses[section.id] || wrapperClasses['default']}">
                    ${topText}
                    <div class="center-wrapper">
                        ${leftText}
                        ${imageHTML}
                        ${rightText}
                    </div>
                    ${bottomText}
                </div>
                ${buttonsHTML}
            </div>
        `;
    }

    // 1.7. クイズ 選択肢ランダム配置
    // 1.6. 画面全体に選択肢　(kamuyutar対戦前)
    // 1.8. ラストメッセージ (左上、右下配置)
    // 2. クイズ前

    // セクションの全体のHTMLを組み立てる
    return sectionHTML;
}

// HTMLを生成
const mainBlock = document.getElementById('mainBlock');
sections.forEach(section => {
    mainBlock.innerHTML += createSectionHTML(section);
});

// 最初のセクションを表示
showSection("level");
//toggleTips();