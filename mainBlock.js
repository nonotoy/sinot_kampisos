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

// === 修正: デバウンス関数を追加 ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === 修正: 画面サイズ取得の改善 ===
function updateDimensions() {
    var myDiv = document.getElementById('mainBlock');
    if (myDiv) {
        const rect = myDiv.getBoundingClientRect();
        mainBlockHeight = rect.height;
        mainBlockWidth = rect.width;
        
        // より正確な画面サイズを取得
        const element = document.querySelector('.quiz_options_height');
        if (element) {
            const elementRect = element.getBoundingClientRect();
            mainBlockHeight = Math.max(mainBlockHeight, elementRect.height);
            mainBlockWidth = Math.max(mainBlockWidth, elementRect.width);
        }
    }
    
    // === 修正: 現在表示中のセクションのレイアウトを再計算 ===
    const currentSection = document.querySelector('.section:not([style*="display: none"])');
    if (currentSection && currentSection.id.includes('ACT03_10')) {
        randomizeButtons(currentSection);
    }
}

// ランダムなクイズを生成
const randomQuizzes_ACT02_action_easy = generateRandomQuizzes('ACT02a_action_easy', 58, 5, 3)
const randomQuizzes_ACT02_action_hard = generateRandomQuizzes('ACT02a_action_hard', 63, 5, 3)
const randomQuizzes_ACT02_advanced_easy = generateRandomQuizzes('ACT02a_advanced_easy', 12, 5, 3)
//const randomQuizzes_ACT02_advanced_hard = generateRandomQuizzes('ACT02a_advanced_hard', 3, 5, 3)
const randomQuizzes_ACT02_animals_easy = generateRandomQuizzes('ACT02a_animals_easy', 24, 5, 3)
const randomQuizzes_ACT02_animals_hard = generateRandomQuizzes('ACT02a_animals_hard', 27, 5, 3)
const randomQuizzes_ACT02_beginner_easy = generateRandomQuizzes('ACT02a_beginner_easy', 8, 5, 3)
const randomQuizzes_ACT02_beginner_hard = generateRandomQuizzes('ACT02a_beginner_hard', 14, 5, 3)
const randomQuizzes_ACT02_body_easy = generateRandomQuizzes('ACT02a_body_easy', 25, 5, 3)
const randomQuizzes_ACT02_body_hard = generateRandomQuizzes('ACT02a_body_hard', 27, 5, 3)
const randomQuizzes_ACT02_food_easy = generateRandomQuizzes('ACT02a_food_easy', 13, 5, 3)
const randomQuizzes_ACT02_food_hard = generateRandomQuizzes('ACT02a_food_hard', 10, 5, 3)
const randomQuizzes_ACT02_human_easy = generateRandomQuizzes('ACT02a_human_easy', 21, 5, 3)
const randomQuizzes_ACT02_human_hard = generateRandomQuizzes('ACT02a_human_hard', 26, 5, 3)
const randomQuizzes_ACT02_nature_easy = generateRandomQuizzes('ACT02a_nature_easy', 19, 5, 3)
const randomQuizzes_ACT02_nature_hard = generateRandomQuizzes('ACT02a_nature_hard', 25, 5, 3)
const randomQuizzes_ACT02_number_easy = generateRandomQuizzes('ACT02a_number_easy', 32, 5, 3)
const randomQuizzes_ACT02_number_hard = generateRandomQuizzes('ACT02a_number_hard', 19, 5, 3)
const randomQuizzes_ACT02_places_easy = generateRandomQuizzes('ACT02a_places_hard', 7, 5, 3)
const randomQuizzes_ACT02_places_hard = generateRandomQuizzes('ACT02a_places_hard', 10, 5, 3)
const randomQuizzes_ACT02_plants_easy = generateRandomQuizzes('ACT02a_plants_easy', 15, 5, 3)
const randomQuizzes_ACT02_plants_hard = generateRandomQuizzes('ACT02a_plants_hard', 26, 5, 3)
const randomQuizzes_ACT02_property_easy = generateRandomQuizzes('ACT02a_property_easy', 30, 5, 3)
const randomQuizzes_ACT02_property_hard = generateRandomQuizzes('ACT02a_property_hard', 35, 5, 3)
const randomQuizzes_ACT02_space_hard = generateRandomQuizzes('ACT02a_space_hard', 30, 5, 3)
const randomQuizzes_ACT02_time_easy = generateRandomQuizzes('ACT02a_time_easy', 20, 5, 3)
const randomQuizzes_ACT02_time_hard = generateRandomQuizzes('ACT02a_time_hard', 13, 5, 3)
const randomQuizzes_ACT02_tool_easy = generateRandomQuizzes('ACT02a_tool_easy', 23, 5, 3)
const randomQuizzes_ACT02_tool_hard = generateRandomQuizzes('ACT02a_tool_hard', 20, 5, 3)
const randomQuizzes_ACT03_09 = generateRandomQuizzes('ACT03_09', 199, 5, 8);
const randomQuizzes_ACT03_10 = generateRandomQuizzes('ACT03_10', 9, 5, 30);

//const randomQuizzes_ACT02_all_easy = generateRandomQuizzes('ACT02a', 11, 5, 3); // randomQuizzes_ACT02_***_easyを統合
//const randomQuizzes_ACT02_all_hard = generateRandomQuizzes('ACT02a', 11, 5, 3); // randomQuizzes_ACT02_***_hardを統合


// セクションの表示・非表示を切り替える
window.showSection = function(sectionId) {
    const allSections = document.querySelectorAll('.section');
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

                // === 修正: より正確な座標取得 ===
                mainBlockHeight = Math.max(rect.height, window.innerHeight * 0.65);
                mainBlockWidth = Math.max(rect.width, window.innerWidth * 0.85);
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
    if (level === 'child') {
        char_type = 'child';
        toggleChars();
    }
}

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
        'ACT02a_action_easy': 'ACT02_end',
        'ACT02a_action_hard': 'ACT02_end',
        'ACT02a_advanced_easy': 'ACT02_end',
        'ACT02a_advanced_hard': 'ACT02_end',
        'ACT02a_animals_easy': 'ACT02_end',
        'ACT02a_animals_hard': 'ACT02_end',
        'ACT02a_beginner_easy': 'ACT02_end',
        'ACT02a_beginner_hard': 'ACT02_end',
        'ACT02a_body_easy': 'ACT02_end',
        'ACT02a_body_hard': 'ACT02_end',
        'ACT02a_food_easy': 'ACT02_end',
        'ACT02a_food_hard': 'ACT02_end',
        'ACT02a_human_easy': 'ACT02_end',
        'ACT02a_human_hard': 'ACT02_end',
        'ACT02a_nature_easy': 'ACT02_end',
        'ACT02a_nature_hard': 'ACT02_end',
        'ACT02a_number_easy': 'ACT02_end',
        'ACT02a_number_hard': 'ACT02_end',
        'ACT02a_places_easy': 'ACT02_end',
        'ACT02a_places_hard': 'ACT02_end',
        'ACT02a_plants_easy': 'ACT02_end',
        'ACT02a_plants_hard': 'ACT02_end',
        'ACT02a_property_easy': 'ACT02_end',
        'ACT02a_property_hard': 'ACT02_end',
        'ACT02a_space_hard': 'ACT02_end',
        'ACT02a_time_easy': 'ACT02_end',
        'ACT02a_time_hard': 'ACT02_end',
        'ACT02a_tool_easy': 'ACT02_end',
        'ACT02a_tool_hard': 'ACT02_end',
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

    const button_container = '.' + optionId
    
    let optionElement = ''

    if (sectionId.includes('ACT02')) {
        optionElement = document.querySelector(`#${sectionId} ${button_container} #${optionId}`)
    } else {
        optionElement = document.querySelector(`#${sectionId} .button-container-horizontal #${optionId}`)
    }

    if (optionElement) {
        // onclick属性を更新して、指定されたfirstQuizIdを使用するようにする
        optionElement.setAttribute('onclick', `showSection('${firstQuizId}')`);
    } else {
        console.error('Option not found:', optionElement);
    }
}

function randomizeButtons(sectionElement) {
    // === 修正: レスポンシブ対応のためのエラーハンドリング追加 ===
    if (!sectionElement) {
        console.error('Section element not found for randomization');
        return;
    }

    // 一時的にセクションのvisibilityをvisibleに設定
    const originalVisibility = sectionElement.style.visibility;
    sectionElement.style.visibility = 'visible';

    // 'target-container'クラスを持つ要素を検索
    const targetContainer = sectionElement.querySelector('.quiz_options_height');
    if (!targetContainer) {
        console.error('Target container not found!');
        return;
    }

    // === 修正: より正確なコンテナサイズ取得 ===
    const containerRect = targetContainer.getBoundingClientRect();
    const actualMainBlockHeight = containerRect.height || mainBlockHeight;
    const actualMainBlockWidth = containerRect.width || mainBlockWidth;

    const buttons = sectionElement.querySelectorAll('button');

    buttons.forEach(button => {

        // === 修正: ボタンサイズを動的に取得 ===
        const buttonRect = button.getBoundingClientRect();
        const buttonWidth = Math.max(buttonRect.width, 120); // 最小幅を保証
        const buttonHeight = Math.max(buttonRect.height, 50); // 最小高さを保証

        // === 修正: より安全な位置計算 ===
        const maxX = Math.max(actualMainBlockWidth - buttonWidth, 0);
        const maxY = Math.max(actualMainBlockHeight - buttonHeight, 0);
        
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

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
        return;
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
                button.setAttribute('onclick', `checkAnswer('${quiz.id}', '${option.id}')`);
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
            // === 修正: レスポンシブ対応のための遅延実行 ===
            setTimeout(() => {
                randomizeButtons(sectionElement);
            }, 100);
        }
    });
}

function generateAndUpdateRandomQuizzes() {

    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_animals_easy[0].id, 'option1-1');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_plants_easy[0].id, 'option1-2');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_nature_easy[0].id, 'option1-3');
    // updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_space_easy[0].id, 'option1-4');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_human_easy[0].id, 'option2-1');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_body_easy[0].id, 'option2-2');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_action_easy[0].id, 'option2-3');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_property_easy[0].id, 'option2-4');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_tool_easy[0].id, 'option3-1');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_food_easy[0].id, 'option3-2');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_time_easy[0].id, 'option3-3');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_number_easy[0].id, 'option3-4');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_places_easy[0].id, 'option4-1');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_beginner_easy[0].id, 'option4-2');
    updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02_advanced_easy[0].id, 'option4-3');
    // updateQuizSections('ACT02_genre_easy', randomQuizzes_ACT02[0].id, 'at_random');

    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_animals_hard[0].id, 'option1-1');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_plants_hard[0].id, 'option1-2');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_nature_hard[0].id, 'option1-3');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_space_hard[0].id, 'option1-4');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_human_hard[0].id, 'option2-1');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_body_hard[0].id, 'option2-2');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_action_hard[0].id, 'option2-3');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_property_hard[0].id, 'option2-4');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_tool_hard[0].id, 'option3-1');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_food_hard[0].id, 'option3-2');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_time_hard[0].id, 'option3-3');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_number_hard[0].id, 'option3-4');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_places_hard[0].id, 'option4-1');
    updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_beginner_hard[0].id, 'option4-2');
    //updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02_advanced_hard[0].id, 'option4-3');
    //updateQuizSections('ACT02_genre_hard', randomQuizzes_ACT02[0].id, 'at_random');

    updateQuizSections('ACT03_09', randomQuizzes_ACT03_09[0].id, 'option2');
    updateQuizSections('ACT03_10', randomQuizzes_ACT03_10[0].id, 'option1');

    // HTMLに変換してDOMに挿入する関数
    // renderQuizzes(randomQuizzes_ACT02);
    renderQuizzes(randomQuizzes_ACT02_action_easy);
    renderQuizzes(randomQuizzes_ACT02_action_hard);
    renderQuizzes(randomQuizzes_ACT02_advanced_easy);
    //renderQuizzes(randomQuizzes_ACT02_advanced_hard);
    renderQuizzes(randomQuizzes_ACT02_animals_easy);
    renderQuizzes(randomQuizzes_ACT02_animals_hard);
    renderQuizzes(randomQuizzes_ACT02_beginner_easy);
    renderQuizzes(randomQuizzes_ACT02_beginner_hard);
    renderQuizzes(randomQuizzes_ACT02_body_easy);
    renderQuizzes(randomQuizzes_ACT02_body_hard);
    renderQuizzes(randomQuizzes_ACT02_food_easy);
    renderQuizzes(randomQuizzes_ACT02_food_hard);
    renderQuizzes(randomQuizzes_ACT02_human_easy);
    renderQuizzes(randomQuizzes_ACT02_human_hard);
    renderQuizzes(randomQuizzes_ACT02_nature_easy);
    renderQuizzes(randomQuizzes_ACT02_nature_hard);
    renderQuizzes(randomQuizzes_ACT02_number_easy);
    renderQuizzes(randomQuizzes_ACT02_number_hard);
    renderQuizzes(randomQuizzes_ACT02_places_easy);
    renderQuizzes(randomQuizzes_ACT02_places_hard);
    renderQuizzes(randomQuizzes_ACT02_plants_easy);
    renderQuizzes(randomQuizzes_ACT02_plants_hard);
    renderQuizzes(randomQuizzes_ACT02_property_easy);
    renderQuizzes(randomQuizzes_ACT02_property_hard);
    renderQuizzes(randomQuizzes_ACT02_space_hard);
    renderQuizzes(randomQuizzes_ACT02_time_easy);
    renderQuizzes(randomQuizzes_ACT02_time_hard);
    renderQuizzes(randomQuizzes_ACT02_tool_easy);
    renderQuizzes(randomQuizzes_ACT02_tool_hard);

    renderQuizzes(randomQuizzes_ACT03_09);
    renderQuizzes(randomQuizzes_ACT03_10);
}


// クイズの正解・不正解を判定
window.checkAnswer = function(sectionId, optionId) {

    const quizArray = 
        //sectionId.startsWith('ACT02a') ? randomQuizzes_ACT02 :
        sectionId.startsWith('ACT02a_action_easy') ? randomQuizzes_ACT02_action_easy :
        sectionId.startsWith('ACT02a_action_hard') ? randomQuizzes_ACT02_action_hard :
        sectionId.startsWith('ACT02a_advanced_easy') ? randomQuizzes_ACT02_advanced_easy :
        //sectionId.startsWith('ACT02a_advanced_hard') ? randomQuizzes_ACT02_advanced_hard :
        sectionId.startsWith('ACT02a_animals_easy') ? randomQuizzes_ACT02_animals_easy :
        sectionId.startsWith('ACT02a_animals_hard') ? randomQuizzes_ACT02_animals_hard :
        sectionId.startsWith('ACT02a_beginner_easy') ? randomQuizzes_ACT02_beginner_easy :
        sectionId.startsWith('ACT02a_beginner_hard') ? randomQuizzes_ACT02_beginner_hard :
        sectionId.startsWith('ACT02a_body_easy') ? randomQuizzes_ACT02_body_easy :
        sectionId.startsWith('ACT02a_body_hard') ? randomQuizzes_ACT02_body_hard :
        sectionId.startsWith('ACT02a_food_easy') ? randomQuizzes_ACT02_food_easy :
        sectionId.startsWith('ACT02a_food_hard') ? randomQuizzes_ACT02_food_hard :
        sectionId.startsWith('ACT02a_human_easy') ? randomQuizzes_ACT02_human_easy :
        sectionId.startsWith('ACT02a_human_hard') ? randomQuizzes_ACT02_human_hard :
        sectionId.startsWith('ACT02a_nature_easy') ? randomQuizzes_ACT02_nature_easy :
        sectionId.startsWith('ACT02a_nature_hard') ? randomQuizzes_ACT02_nature_hard :
        sectionId.startsWith('ACT02a_number_easy') ? randomQuizzes_ACT02_number_easy :
        sectionId.startsWith('ACT02a_number_hard') ? randomQuizzes_ACT02_number_hard :
        sectionId.startsWith('ACT02a_places_easy') ? randomQuizzes_ACT02_places_easy :
        sectionId.startsWith('ACT02a_places_hard') ? randomQuizzes_ACT02_places_hard :
        sectionId.startsWith('ACT02a_plants_easy') ? randomQuizzes_ACT02_plants_easy :
        sectionId.startsWith('ACT02a_plants_hard') ? randomQuizzes_ACT02_plants_hard :
        sectionId.startsWith('ACT02a_property_easy') ? randomQuizzes_ACT02_property_easy :
        sectionId.startsWith('ACT02a_property_hard') ? randomQuizzes_ACT02_property_hard :
        sectionId.startsWith('ACT02a_space_hard') ? randomQuizzes_ACT02_space_hard :
        sectionId.startsWith('ACT02a_time_easy') ? randomQuizzes_ACT02_time_easy :
        sectionId.startsWith('ACT02a_time_hard') ? randomQuizzes_ACT02_time_hard :
        sectionId.startsWith('ACT02a_tool_easy') ? randomQuizzes_ACT02_tool_easy :
        sectionId.startsWith('ACT03_09') ? randomQuizzes_ACT03_09 :
        randomQuizzes_ACT03_10;
                      
    const section = quizArray.find(quiz => quiz.id === sectionId);
    console.log(section);
    const option = section.options.find(option => option.id === optionId);
    const answer = option.answer;

    if (answer) {
        // 正解の場合
        displayImage(CORRECT_IMAGE_PATH, section.next, 'rgba(255, 0, 0, 0.2)');
        if (sectionId.startsWith('ACT02a')) {
            correctCountACT02++;
        } else {
            correctCountACT03++;
        }

        // window[sectionId.startsWith('ACT02a') ? 'correctCountACT02' : 'correctCountACT03']++;
    } else {
        // 不正解の場合
        displayImage(INCORRECT_IMAGE_PATH, section.next, 'rgba(0, 123, 255, 0.2)');
    }

    console.log('Correct count:', correctCountACT02);
    console.log('Correct count:', correctCountACT03);
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
      3: 'ACT02_result_B',
      2: 'ACT02_result_C',
      1: 'ACT02_result_D',
      0: 'ACT02_result_D',
    };
  
    const section = sectionMap[correctCountACT02] || 'ACT02_result_A';
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

document.getElementById('tips_button').addEventListener('click', toggleTips);

// 文字表記を切り替える
function toggleChars() {

    if (char_type === 'child') {
        char_type = 'child';
    } else if (char_type === 'kana') {
        char_type = 'roman';
    } else {
        char_type = 'kana';
    }

    console.log(char_type);

    updateAllTextContents(char_type)
};

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
        button.removeEventListener('click', toggleChars);
        button.addEventListener('click', toggleChars);
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
            } else if (image.image_class.includes('mission')) {
                    imageHTML += `
                        <div class="mission-image_class">
                            <img src="${image.data}" alt="${section.id}" class="${image.image_class}">
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
                <button id="${option.id}" onclick="checkAnswer('${section.id}', '${option.id}')">
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


    // ACT02_genre
    } else if (section.id.includes('ACT02_genre')) {

        let buttonsHTML_atrandom = '';

        for (const option of section.options) {
            if ((section.id === 'ACT02_genre_easy' && option.id === 'option1-4') || (section.id === 'ACT02_genre_hard' && option.id === 'option4-2') || (option.id === 'option4-1') || (option.id === 'option4-4') ) {
                buttonsHTML_tmp += `
                    <div class="${option.id}">
                        <button disabled id="${option.id}" class="section-switch grid_button" onclick="showSection('${option.nextSection}')">
                            <div class="button_description" data-key="${option.descKey}"></div>
                            <div class="button_description-tips" data-key="${option.descKey}"></div>
                        </button>
                    </div>
                `;     
            
            } else if (option.id != 'at_random') {
                buttonsHTML_tmp += `
                    <div class="${option.id}">
                        <button id="${option.id}" class="section-switch grid_button" onclick="showSection('${option.nextSection}')">
                            <div class="button_description" data-key="${option.descKey}"></div>
                            <div class="button_description-tips" data-key="${option.descKey}"></div>
                        </button>
                    </div>
                `;
            
            } else {
                buttonsHTML_atrandom = `
                    <div class="${option.id}">
                        <button disabled id="${option.id}" class="section-switch grid_button" onclick="showSection('${option.nextSection}')">
                            <div class="button_description" data-key="${option.descKey}"></div>
                        </button>
                    </div>
                `;
            }
        };

        let emptyButton = `
            <div class="empty"></div>
            <div class="empty"></div>
            <div class="empty"></div>
        `;
 
        buttonsHTML = `
            <div class="button-container-20grid">
                ${buttonsHTML_tmp}
                ${emptyButton}
                ${buttonsHTML_atrandom}
            </div>`;

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
        } else if (section.id.includes('ACT02_result_')) {
            buttonsLayoutHTML_tmp = "ACT02_10-button-container"
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
    updateTextContent(document.querySelectorAll('.mission'), lang, commands);
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


// 画面の読み込みが完了したら実行
// 確認 - 毎回Home画面に戻った時にクイズを生成し直すのであれば、EventListenerの登録を変更
document.addEventListener('DOMContentLoaded', () => {

    // === 修正: より堅牢なDOMContentLoaded処理 ===
    updateDimensions();
    
    // === 修正: デバウンス付きリサイズイベント ===
    const debouncedUpdateDimensions = debounce(updateDimensions, 250);
    window.addEventListener('resize', debouncedUpdateDimensions);

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

    /*
    // 奥付
    var footer = document.getElementById('footer');
    var modal = document.getElementById('modal');
  
    if (footer && modal) {
      footer.onclick = function() {
        modal.style.display = "block";
      };
    }
    */
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
                    <button class="quiz-option" id="${option.id}" onclick="checkAnswer('${section.id}', '${option.id}')">
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

    // Genre
    } else if (section.section_class === 'quiz_genre') {
            
        for (const msg of section.texts) {
                desc += `
                    <div class="topText" data-key="${msg.key}"></div>
                    <div class="topipText" data-key="${msg.key}"></div>`;
            }
        textHTML = `<div class="genre_title">${desc}</div>`;

        let buttonsHTML = createButtonHTML(section);

        sectionHTML = `
                <div id="${section.id}" class="section elements_centered">
                    ${textHTML}
                    ${buttonsHTML}
                </div>
            `;

    // Missions
    } else if (section.section_class === 'missions') {

        // 画像
        imageHTML = createImageHTML(section);
            
        if (section.texts && section.texts.length > 0) {
            for (const msg of section.texts) {
                    desc += `<div class="${msg.type}" data-key="${msg.key}"></div>`;
                }
            textHTML = `<div class="main-missions-wrapper">${desc}</div>`;
        };

        let buttonsHTML = createButtonHTML(section);

        sectionHTML = `
                <div id="${section.id}" class="section">
                    ${imageHTML}
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
                topText += `
                    <div class="topText" data-key="${text.key}"></div>
                    <div class="topTipText" data-key="${text.key}"></div>
                    `;
            }

            if (text.type.includes('bottom')) {
                bottomText += `
                    <div class="bottomText" data-key="${text.key}"></div>
                    <div class="bottomTipText" data-key="${text.key}"></div>
                    `;
            }

            if (text.type.includes('right')) {
                rightText += `
                    <div class="rightText" data-key="${text.key}"></div>
                    <div class="rightTipText" data-key="${text.key}"></div>
                    `;
            }

            if (text.type.includes('left')) {
                leftText += `
                    <div class="leftText" data-key="${text.key}"></div>
                    <div class="leftTipText" data-key="${text.key}"></div>
                    `;
            }
        };

        let buttonsHTML = createButtonHTML(section);

        const wrapperClasses = {
            'ACT03_start': 'main-wrapper main-wrapper_height_20',
            'default': 'main-wrapper main-wrapper_height_70',
        };
          
        sectionHTML = `
            <div id="${section.id}" class="section">
                <div class="${wrapperClasses[section.id] || wrapperClasses['default']}">
                    <div>
                        ${topText}
                    </div>
                    <div class="center-wrapper">
                        <div class="rightText-wrapper">
                            ${leftText}
                        </div>
                        ${imageHTML}
                        <div class="leftText-wrapper">
                            ${rightText}
                        </div>
                    </div>
                    ${bottomText}
                </div>
                ${buttonsHTML}
            </div>
        `;
    }

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