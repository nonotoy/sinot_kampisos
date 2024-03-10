// 外部ファイルの読み込み
import sections from './sections.js';
import commands from './commands.js';

// headerHTML
let headerHTML = '';

// セクションの表示・非表示を切り替える
window.showSection = function(sectionId) {
    const allSections = document.querySelectorAll('.section');

    allSections.forEach(section => {
        if (section.id.includes('ACT01') || section.id.includes('ACT03')) {

            headerHTML = `
                <a href="index.html" class="title-link">
                    <h1 class="logo">フンペサパのものがたり</h1>
                </a>
                <div id="header-buttons">
                    <button id="tips_button">
                        <div>ヒント</div>
                    </button>
                    <button id="save_button">
                        <div>セーブ</div>
                    </button>
                </div>`

        } else {
          
            headerHTML = `
                <a href="index.html" class="title-link">
                    <h1 class="logo">フンペサパのものがたり</h1>
                </a>
                <div id="header-buttons">
                    <button id="tips_button">
                        <div>ヒント</div>
                    </button>
                </div>`  
        }
    });

}

// HTMLを生成
const headerBlock = document.getElementById('header-container');
headerBlock.innerHTML += headerHTML;

// 最初のセクションを表示
//showSection("0_home");
//toggleTips();