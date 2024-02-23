// 外部ファイルの読み込み
import sections from './sections.js';
import commands from './commands.js';

// 正解・不正解用画像
const CORRECT_IMAGE_PATH = "materials/esaman_correct.png";
const INCORRECT_IMAGE_PATH = "materials/esaman_incorrect.png";

// 正解数のカウント
let correctCountACT02 = 0;

// ランダムなクイズを生成
function generateRandomQuizzes(baseId, totalQuizzes, numberOfQuizzes, numberOfOptions) {
    const selectedIds = new Set();
    while (selectedIds.size < numberOfQuizzes) {
      // 生成されたランダムな数字を3桁の文字列で0埋めする
      const quizNumber = (Math.floor(Math.random() * totalQuizzes) + 1).toString().padStart(3, '0');
      selectedIds.add(`${baseId}_${quizNumber}`);
    }

    const endIDclass = {
        'ACT02a': 'ACT02_end',
        'ACT03': 'ACT03_defeated_01',
    };
  
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
        next: `${endIDclass[section.id]}`,
      };
    });    
}

const randomQuizzes_ACT02 = generateRandomQuizzes('ACT02a', 12, 5, 3);
const randomQuizzes_ACT03 = generateRandomQuizzes('ACT03', 200, 5, 8);

console.log(randomQuizzes_ACT03);

function updateQuizSections(sectionId, firstQuizId, optionId) {
    // 指定されたセクション内で、指定されたoptionIdを持つボタンを探す
    const optionElement = document.querySelector(`#${sectionId} .button-container-vertical #${optionId}`);
    if (optionElement) {
        // onclick属性を更新して、指定されたfirstQuizIdを使用するようにする
        optionElement.setAttribute('onclick', `showSection('${firstQuizId}')`);
    } else {
        console.error('Option not found:', optionId, 'in section:', sectionId);
    }
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
        optionsElement.className = 'options';

        // 選択肢を含む要素を作成
        quiz.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.id = option.id;
            button.setAttribute('onclick', `checkACT02Answer('${quiz.id}', '${option.id}')`);

            const optionTextElement = document.createElement('div');
            optionTextElement.className = 'option-text';
            optionTextElement.setAttribute('data-key', option.descKey); 
            
            const optionText = commands['kana'][String(option.descKey)];
            optionTextElement.innerHTML = `<p>${optionText}</p>`;

            // if button.descKey contains op1, add answer: true
            if (option.descKey.includes('op1')) {
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
    });
}

function generateAndUpdateRandomQuizzes() {

    updateQuizSections('ACT02_home', randomQuizzes_ACT02[0].id, 'option1');
    updateQuizSections('ACT03_09', randomQuizzes_ACT03[0].id, 'option2');
    updateQuizSections('ACT03_10', randomQuizzes_ACT03[0].id, 'option1');

    // HTMLに変換してDOMに挿入する関数
    renderQuizzes(randomQuizzes_ACT02);
    renderQuizzes(randomQuizzes_ACT03);

    // HTMLを生成し、最初のセクションを表示
    // renderSectionsAndShowFirst();
}


// セクションの表示・非表示を切り替える
window.showSection = function(sectionId) {
    const allSections = document.querySelectorAll('.section');
    const controls = document.getElementById("controls");
    const tips = document.querySelectorAll('.tip');

    allSections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block'; // 指定されたセクションを表示

            // 背景色を設定
            const sectionData = sections.find(s => s.id === sectionId);
            if (sectionData && sectionData.backgroundColor) {
                document.body.style.backgroundColor = sectionData.backgroundColor;
            } else {
                document.body.style.backgroundColor = ''; // デフォルト
            }

            // すべてのtipsを一度非表示にする
            section.querySelectorAll('.tip').forEach(tip => {
                tip.style.display = 'none';
            });

        } else {
            section.style.display = 'none'; // 他のセクションを非表示にする
        }
    });
}

// クイズの正解・不正解を判定
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

// クイズ終了後に正解数に基づいてセクションを表示する関数
window.displayACT02SectionBasedOnCorrectCount = function() {
    if (correctCountACT02 > 3) {
        showSection('ACT02_result_A');
    } else if (correctCountACT02 = 3) {
        showSection('ACT02_result_B');
    } else if (correctCountACT02 = 2) {
        showSection('ACT02_result_C');
    } else if (correctCountACT02 < 2) {
        showSection('ACT02_result_D');
    }
};

// クイズ終了後に正解数に基づいてセクションを表示する関数
window.displayEndingBasedOnCorrectCount = function() {
    if (correctCountACT02 >= 4) {
        showSection('ACT03_defeated_01');
    } else if (correctCountACT02 >= 1) {
        showSection('bitter_end_01');
    } else {
        showSection('dead_end');
    }
};


function updateTextContent(elements, lang, commands) {
    elements.forEach((element) => {
        const key = element.getAttribute('data-key');

        if (element.classList.contains('button_description')) {
            element.textContent = commands[lang][key];
        } else if (commands[lang][key]){
            element.innerHTML = `<p>${commands[lang][key]}</p>`;
        } 
    });
}


// Tipsの表示・非表示を切り替える
function toggleTips() {
    const tips = document.getElementsByClassName("tip");
    const tipsVisible = document.getElementById("tips").checked;

    for (let i = 0; i < tips.length; i++) {
        tips[i].style.display = tipsVisible ? "block" : "none";
    }
}

// Call the function immediately after defining it
// toggleTips();


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
    if (section.image) {
        imageHTML = `
            <div class="image">
                <img src="${section.image.data}" alt="${section.id}" class="${section.image.width}">
            </div>`;
    };

    return imageHTML;
}


// 選択肢をシャッフルするための関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
        

    // containerClassがquiz以外で、選択肢がある場合は選択肢分のボタンを表示
    } else if (section.options && section.options.length > 0) {
        for (const option of section.options) {
            buttonsHTML_tmp += `
                <button id="${option.id}" onclick="showSection('${option.nextSection}')">
                    <div class="button_description" data-key="${option.descKey}"></div>
                    <div class="tip" data-key="${option.tipKey}"></div>
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



    // 選択肢がない場合は次へ、戻るボタンを表示
    } else {

        // 戻るボタンのHTMLを作成 || 一つ前に戻らせないフローの場合は戻るボタンを表示しない
        if (section.back) {
            buttonsHTML_tmp += `<button id="back" onclick="showSection('${section.back}')" class="back_button button_position_fixed"><div>戻る</div></button>`
        };

        // 次へ進むボタンのHTMLを作成 || 基本的に次へ進むボタンは表示
        buttonsHTML_tmp += `<button id="next" onclick="showSection('${section.next}')" class="next_button button_position_fixed"><div>次へ</div></button>`

        buttonsLayoutHTML_tmp = "button-container";
    };

    buttonsHTML = `<div class="${buttonsLayoutHTML_tmp}">${buttonsHTML_tmp}</div>`;

    return buttonsHTML;
}



function setupLanguageChangeListeners() {
    const languageButtons = document.getElementsByName('charACT01a_er');
    languageButtons.forEach((button) => {
        button.addEventListener('change', (event) => {
            updateDescription(event.target.value);
        });
    });
}

function updateAllTextContents() {
    const lang = 'kana';
    updateTextContent(document.querySelectorAll('.description'), lang, commands);
    updateTextContent(document.querySelectorAll('.textHTML'), lang, commands);
    updateTextContent(document.querySelectorAll('.topText'), lang, commands);
    updateTextContent(document.querySelectorAll('.bottomText'), lang, commands);
    updateTextContent(document.querySelectorAll('.leftText'), lang, commands);
    updateTextContent(document.querySelectorAll('.rightText'), lang, commands);
    updateTextContent(document.querySelectorAll('.button_description'), lang, commands);
    //updateTextContent(document.querySelectorAll('.tip'), tipLang, commands);
}

document.addEventListener('DOMContentLoaded', () => {
    setupLanguageChangeListeners();
    generateAndUpdateRandomQuizzes();
    updateAllTextContents();
});



function renderSectionsAndShowFirst() {
    const mainBlock = document.getElementById('mainBlock');
    sections.forEach(section => {
        mainBlock.innerHTML += createSectionHTML(section);
    });
    showSection("0_home");
}


// HTMLコードを生成
function createSectionHTML(section) {

    let sectionHTML = '';
    let imageHTML = '';
    let textHTML = '';
    let desc = '';

    // 0. メニュー


    // 2. メッセージのみ
    if (section.section_class === '2_onlytext') {
        
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
                    <div class="twocolumns">
                        <div class="leftcol">
                            ${imageHTML}
                        </div>
                        <div class="rightcol">
                            ${textHTML}
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

        let tmpHTML = '';
        let imageHTML = ''; // 画像データ
        let topText = ''; // 上メッセージ
        let bottomText = ''; // 下メッセージ
        let rightText = ''; // 右メッセージ
        let leftText = ''; // 左メッセージ

        // 画像
        imageHTML = createImageHTML(section)

        // メッセージ
        // 最終的にはまとめられると思う
        for (const text of section.texts) {
            if (text.type === 'topText') {
                topText = `<div class="${text.type}" data-key="${text.key}"></div>`;
            }

            if (text.type === 'bottomText') {
                bottomText = `<div class="${text.type}" data-key="${text.key}"></div>`;
            }

            if (text.type === 'rightText') {
                rightText = `<div class="${text.type}" data-key="${text.key}"></div>`;
            } else {
                rightText = `<div class="rightText"></div>`
            }

            if (text.type === 'leftText') {
                leftText = `<div class="${text.type}" data-key="${text.key}"></div>`;
            } else {
                leftText = `<div class="leftText"></div>`
            }
        };

        tmpHTML += topText;
        tmpHTML += `<div class="center-wrapper">`;
        tmpHTML += leftText;
        tmpHTML += imageHTML;
        tmpHTML += rightText;
        tmpHTML += `</div>`;
        tmpHTML += bottomText;
        // tmpHTML += tmp_imageHTML;
        // tmpHTML += tmp_TextHTML;

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
            ${tmpHTML}
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
showSection("0_home");