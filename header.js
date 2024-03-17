// headerHTML
// セクションの表示・非表示を切り替える
window.showSection = function(sectionId) {
    const allSections = document.querySelectorAll('.section');
    let headerHTML = '';

    allSections.forEach(section => {
        section.style.display = 'none';
        if (section.id === sectionId) {
            section.style.display = '';
        }

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

    // HTMLを生成して適用
    const headerBlock = document.getElementById('headerBlock');
    headerBlock.innerHTML = headerHTML;

}

// 最初のセクションを表示
showSection("0_home");