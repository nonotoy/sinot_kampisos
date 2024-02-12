// 外部ファイルの読み込み
import sections from './sections.js';
import commands from './commands.js';

// 正解・不正解用画像
const CORRECT_IMAGE_PATH = "materials/esaman_correct.png";
const INCORRECT_IMAGE_PATH = "materials/esaman_incorrect.png";

// 正解数のカウント
let correctCount = 0;


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
window.checkAnswer = function(sectionId, optionId) {
    //correctCountはACT02とACT03で分けておきたい

    const section = sections.find(section => section.id === sectionId);
    const option = section.options.find(option => option.id === optionId);
    const answer = option.answer;

    if (answer) {

        // 正解の場合

        displayImage(CORRECT_IMAGE_PATH, section.next, 'rgba(255, 0, 0, 0.2)');
        correctCount++;

    } else {

        // 不正解の場合
        displayImage(INCORRECT_IMAGE_PATH, section.next, 'rgba(0, 123, 255, 0.2)');

    }

    // 次のセクションを表示
    console.log(correctCount);
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
window.displaySectionBasedOnCorrectCount = function() {
    let nextSectionId = correctCount >= 1 ? 'ACT02_result_A' : 'ACT02_result_D';
    showSection(nextSectionId);
};

function updateTextContent(elements, lang, commands) {
    elements.forEach((element) => {
        const key = element.getAttribute('data-key');

        if (element.classList.contains('button_description')) {
            element.textContent = commands[lang][key];
        } else if (commands[lang][key]){
            element.innerHTML = '<p>' + commands[lang][key] + '</p>';
        };;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.getElementsByName('charACT01a_er');
    const lang = 'kana';
    const descriptions = document.querySelectorAll('.description');
    const texts = document.querySelectorAll('.textHTML');

    const topText = document.querySelectorAll('.topText');
    const bottomText = document.querySelectorAll('.bottomText');
    const leftText = document.querySelectorAll('.leftText');
    const rightText = document.querySelectorAll('.rightText');
    
    const buttondescriptions = document.querySelectorAll('.button_description');
    const tips = document.querySelectorAll('.tip');

    languageButtons.forEach((button) => {
        button.addEventListener('change', (event) => {
            updateDescription(event.target.value);
        });
    });

    updateTextContent(descriptions, lang, commands);
    updateTextContent(texts, lang, commands);
    updateTextContent(topText, lang, commands);
    updateTextContent(bottomText, lang, commands);
    updateTextContent(leftText, lang, commands);
    updateTextContent(rightText, lang, commands);

    updateTextContent(buttondescriptions, lang, commands);
    //updateTextContent(tips, tipLang, commands);
});


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
                <button id="${option.id}" onclick="checkAnswer('${section.id}', '${option.id}')">
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
                <button id="${option.id}" onclick="displaySectionBasedOnCorrectCount()">
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

        // 選択肢ボタンのレイアウトを決定 (選択肢ボタンがない場合はレイアウト自体が固定ないので、このif文のみに記載)
        if (section.verticalLayout === true) {
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
            textHTML = `<div class="description">
                            ${desc}
                        </div>`;
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
        
        // 問題文
        if (section.texts && section.texts.length > 0) {
            for (const msg of section.texts) {
                    desc += `<div class="${msg.type}" data-key="${msg.key}"></div>`;
                }
            textHTML = `<div class="description">${desc}</div>`;
        };

        // 選択肢 (ボタン)
        let buttonsHTML = createButtonHTML(section);

        sectionHTML = `
                <div id="${section.id}" class="section">
                    <div class="main-wrapper">
                        ${textHTML}
                    </div>
                    <div class="quiz-button-container">
                        ${buttonsHTML}
                    </div>
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
        //saveButton.innerHTML += `<button id="save" onclick="saveToLocal({score:${correctCount}} class="save_button")">Save</button>`;
        //${savebuttonsHTML}

        sectionHTML = `
                <div id="${section.id}" class="section">
                    <div class="main-wrapper">
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
for (const section of sections) {
    mainBlock.innerHTML += createSectionHTML(section);
}

showSection("0_home")