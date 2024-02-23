export const sections = [
	// id: セクションのID
	// section_class: Containerのスタイル
	// texts: 表示される文章 (type: description, tip)
	// image: 画像のパス
	// options: 選択肢ボタンの情報 (id: ボタンのID, nextSection: 次のセクションのID, descKey: ボタンの説明文のキー, tipKey: ボタンのヒントのキー)
	// verticalLayout: true

	{
		id: '0_home',
		section_class: '0_menu',
		texts: [
				{ type: 'description', key: '0_home' }
		],
		image: 	{ data: 'materials/esaman_1.png', width: 'width_80'},
		options: [
				{ id: 'option1', nextSection: '1-1_prologue1', descKey: 'opt_1a'},
				{ id: 'option2', nextSection: 'ACT02_home', descKey: 'opt_1b'},
				{ id: 'option3', nextSection: 'ACT03_01', descKey: 'opt_1c'}
		],
		verticalLayout: true,
	},
	{
		id: '1-1_prologue1',
		section_class: '2_onlytext',
		texts: [
				{ type: 'description', key: '1-1_prologue1'}
		],
		back: '0_home',
		next: '1-2_prologue2',
	},
	{ 
		id: '1-2_prologue2',
		image: 	{ data: 'materials/esaman_1.png', width: 'width_60'},
		texts: [
				{ type: 'topText', key: '1-2_prologue2'}
		],
		back: '1-1_prologue1',
		next: 'missions',
	},
	{
		id: 'missions',
		image: 	{ data: 'materials/missions.png', width: 'width_60'},
		texts: [],
		back: '1-2_prologue2',
		next: 'map',
	},
	{
		id: 'map',
		image: 	{ data: 'materials/map.png', width: 'width_60'},
		texts: [],
		back: 'missions',
		next: 'guidance',
	},
	{
		id: 'guidance',
		texts: [
				{ type: 'topText', key: 'guidance'}
		],
		image: 	{ data: 'materials/guidance.png', width: 'width_80'},
		options: [
				{ id: 'option1', nextSection: 'ACT01a_11', descKey: 'guidance_a'},
				{ id: 'option2', nextSection: 'ACT01a_01', descKey: 'guidance_b'}
		],
	},

	// simoisamun
		{
		id: 'ACT01a_01', // simoisamun
		texts: [
				{ type: 'topText', key: 'ACT01a_01'}
		],
		image: 	{ data: 'materials/ACT01a_01.png', width: 'width_90'},
		back: 'guidance',
		next: 'ACT01a_02',
	},
	{
		id: 'ACT01a_02', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01a_02'},
				{ type: 'leftText', key: 'ACT01a_02_left'},
				{ type: 'rightText', key: 'ACT01a_02_right'},
		],
		image: 	{ data: 'materials/ACT01a_02.png', width: 'width_90'},
		back: 'ACT01a_01',
		next: 'ACT01a_03',
	},
	{
		id: 'ACT01a_03', //
		texts: [
				{ type: 'topText', key: 'ACT01a_03'},
				{ type: 'leftText', key: 'ACT01a_03_left'},
		],
		image: 	{ data: 'materials/ACT01a_03.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01a_04', descKey: 'ACT01a_03a'}
		],
	},
	{
		id: 'ACT01a_04', //
		texts: [
				{ type: 'topText', key: 'ACT01a_04'}
		],
		image: 	{ data: 'materials/ACT01a_04.png', width: 'width_90'},
		back: 'ACT01a_03',
		next: 'ACT01a_05',
	},
	{
		id: 'ACT01a_05', //
		texts: [
				{ type: 'topText', key: 'ACT01a_05'},
				{ type: 'leftText', key: 'ACT01a_05_left'},
		],
		image: 	{ data: 'materials/ACT01a_05.png', width: 'width_90'},
		back: 'ACT01a_04',
		next: 'ACT01a_06',
	},
	{
		id: 'ACT01a_06',
		texts: [],
		image: 	{ data: 'materials/ACT01a_06.png', width: 'width_60'},
		options: [
				{ id: 'option1', nextSection: 'ACT01a_07', descKey: 'ACT01a_06a'}
		],
	},
	{
		id: 'ACT01a_07', // herikasi un
		texts: [
				{ type: 'topText', key: 'ACT01a_07'}
		],
		image: 	{ data: 'materials/ACT01a_07.png', width: 'width_90'},
		back: 'ACT01a_06',
		next: 'ACT01a_08',
	},
	{
		id: 'ACT01a_08', //
		texts: [
				{ type: 'topText', key: 'ACT01a_08'},
				{ type: 'leftText', key: 'ACT01a_08_left'},
		],
		image: 	{ data: 'materials/ACT01a_08.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01a_09', descKey: 'ACT01a_08a'}
		],
	},
	{
		id: 'ACT01a_09', // herikasi un
		texts: [
				{ type: 'topText', key: 'ACT01a_09'},
				{ type: 'leftText', key: 'ACT01a_09_left'},
		],
		image: 	{ data: 'materials/ACT01a_09.png', width: 'width_90'},
		back: 'ACT01a_08',
		next: 'paskur',
	},
	{
		id: 'paskur', // paskur
		texts: [
				{ type: 'topText', key: 'paskur'},
				{ type: 'leftText', key: 'paskur_left'},
		],
		image: 	{ data: 'materials/paskur.png', width: 'width_110'},
		options: [
				{ id: 'option1', nextSection: 'paskur_a01', descKey: 'paskur_a'},
				{ id: 'option2', nextSection: 'paskur_b01', descKey: 'paskur_b'}
		],
	},
	{
		id: 'paskur_a01', // siyokina
		section_class: '3_leftimg',
		image: 	{ data: 'materials/paskur_a01.jpg', width: 'width_60'},
		texts: [
				{ type: 'description', key: 'paskur_a01'}
		],
		next: 'paskur_a02',
	},
	{
		id: 'paskur_a02', // siyokina
		section_class: '3_leftimg',
		image: 	{ data: 'materials/paskur_a02.png', width: 'width_60'},
		texts: [
				{ type: 'description', key: 'paskur_a02'}
		],
		next: 'paskur',
	},
	{
		id: 'paskur_b01', // kamuyutar
		section_class: '3_leftimg',
		image: 	{ data: 'materials/paskur_b01.png', width: 'width_60'},
		texts: [
				{ type: 'description', key: 'paskur_b01'}
		],
		next: 'paskur_b02',
	},
	{
		id: 'paskur_b02', // siyokina
		section_class: '3_leftimg',
		image: 	{ data: 'materials/paskur_b02.png', width: 'width_60'},
		texts: [
				{ type: 'description', key: 'paskur_b02'}
		],
		next: 'ACT01a_10',
	},
	{
		id: 'ACT01a_10', // paskur -> pet
		texts: [
				{ type: 'topText', key: 'ACT01a_10'}
		],
		image: 	{ data: 'materials/ACT01a_10.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'pet', descKey: 'ACT01a_10a'}
		],
	},

	// ---simoisamun---
		{
		id: 'ACT01a_11',
		texts: [
				{ type: 'topText', key: 'ACT01a_11'},
				{ type: 'leftText', key: 'ACT01a_11_left'},
		],
		image: 	{ data: 'materials/ACT01a_11.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01a_12', descKey: 'ACT01a_11a'},
				{ id: 'option2', nextSection: 'guidance', descKey: 'ACT01a_11b'},
		],
	},
	{
		id: 'ACT01a_12', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01a_12'}
		],
		image: 	{ data: 'materials/ACT01a_12.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01a_13', descKey: 'ACT01a_12a'}
		],
	},
	{
		id: 'ACT01a_13', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01a_13'}
		],
		image: 	{ data: 'materials/ACT01a_13.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01a_14', descKey: 'ACT01a_13a'},
				{ id: 'option2', nextSection: 'ACT01a_20', descKey: 'ACT01a_13b'}
		],
	},
	{
		id: 'ACT01a_14', // hoyupu
		texts: [
				{ type: 'topText', key: 'ACT01a_14'}
		],
		image: 	{ data: 'materials/ACT01a_14.png', width: 'width_90'},
		next: 'ACT01a_15',
	},
	{
		id: 'ACT01a_15', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01a_15'}
		],
		image: 	{ data: 'materials/ACT01a_15.jpg', width: 'width_90'},
		next: 'ACT01a_16',
	},
	{
		id: 'ACT01a_16', // turse
		texts: [
				{ type: 'topText', key: 'ACT01a_16'}
		],
		image: 	{ data: 'materials/ACT01a_16.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01a_17', descKey: 'ACT01a_16a'},
				{ id: 'option2', nextSection: 'ACT01a_18', descKey: 'ACT01a_16b'}
		],
	},
	{
		id: 'ACT01a_17', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01a_17'}
		],
		image: 	{ data: 'materials/ACT01a_17.png', width: 'width_90'},
		next: 'pet',
	},
	// poknamosir  ここはかなり変わる可能性がある
		{
		id: 'ACT01a_18', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01a_18'}
		],
		image: 	{ data: 'materials/ACT01a_18_01.png', width: 'width_90'},
		next: 'ACT01a_19',
	},
	{
		id: 'ACT01a_19', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01a_19'}
		],
		image: 	{ data: 'materials/ACT01a_19.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'poknamosir', descKey: 'ACT01a_19a'}, // poknamosirができたら接続
				{ id: 'option2', nextSection: 'ACT01a_16', descKey: 'ACT01a_19b'}
		]
	},
	{
		id: 'poknamosir', // poknamosir仮置き
		texts: [
				{ type: 'topText', key: 'poknamosir'}
		],
		image: 	{ data: 'materials/poknamosir.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: '0_home', descKey: 'tentative'} // poknamosirができたら接続
		],
	},
	{
		id: 'ACT01a_20', // tumikor
		texts: [
				{ type: 'topText', key: 'ACT01a_20'}
		],
		options: [
				{ id: 'option1', nextSection: 'ACT01a_21', descKey: 'ACT01a_20a'}
		],
	},
	{
		id: 'ACT01a_21', // tumikor - tuypa
		texts: [
				{ type: 'topText', key: 'ACT01a_21'}
		],
		options: [
				{ id: 'option1', nextSection: 'ACT01a_22', descKey: 'ACT01a_21a'}
		],
	},
	{
		id: 'ACT01a_22', // tumokor - tuypa - tawki
		texts: [
				{ type: 'topText', key: 'ACT01a_22'}
		],
		next: 'pet',
	},

	// ---pet---
		{
		id: 'pet', // pet
		texts: [
				{ type: 'topText', key: 'pet'}
		],
		image: 	{ data: 'materials/pet.png', width: 'width_110'},
		next: 'ACT01b_01',
	},

	// ---ACT01b (ACT01b_01 to kim)---
	{
		id: 'ACT01b_01', // paskur -> pet
		texts: [
				{ type: 'topText', key: 'ACT01b_01'}
		],
		image: 	{ data: 'materials/ACT01b_01.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01b_02', descKey: 'ACT01b_01a'},
				{ id: 'option2', nextSection: 'ACT01b_08', descKey: 'ACT01b_01b'},
		],
	},
	{
		id: 'ACT01b_02', // simoisamta
		texts: [
				{ type: 'topText', key: 'ACT01b_02'}
		],
		image: 	{ data: 'materials/ACT01b_02.png', width: 'width_90'},
		back: 'ACT01b_01',
		next: 'ACT01b_03',
	},
	{
		id: 'ACT01b_03', // simoisamta 画像名変更
		texts: [
				{ type: 'topText', key: 'ACT01b_03'}
		],
		image: 	{ data: 'materials/ACT01b_02_2.png', width: 'width_90'},
		back: 'ACT01b_02',
		next: 'ACT01b_04',
	},
	{
		id: 'ACT01b_04', // simoisamta 画像名変更
		texts: [
				{ type: 'topText', key: 'ACT01b_04'}
		],
		image: 	{ data: 'materials/ACT01b_03.png', width: 'width_90'},
		back: 'ACT01b_03',
		next: 'ACT01b_05',
	},
	{
		id: 'ACT01b_05', // simoisamta
		texts: [
				{ type: 'topText', key: 'ACT01b_05'}
		],
		image: 	{ data: 'materials/ACT01b_05.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01b_06', descKey: 'ACT01b_05a'},
		],
	},
	{
		id: 'ACT01b_06', // simoisamta
		texts: [
				{ type: 'topText', key: 'ACT01b_06'}
		],
		image: 	{ data: 'materials/ACT01b_06.png', width: 'width_90'},
		back: 'ACT01b_05',
		next: 'ACT01b_07',
	},
	{
		id: 'ACT01b_07', // simoisamta
		texts: [
				{ type: 'topText', key: 'ACT01b_07'},
				{ type: 'leftText', key: 'ACT01b_07_left'}
		],
		image: 	{ data: 'materials/ACT01b_07.png', width: 'width_90'},
		back: 'ACT01b_06',
		next: 'kim_3',
	},

	{
		id: 'ACT01b_08', // simoisamta
		texts: [
				{ type: 'topText', key: 'ACT01b_08'}
		],
		image: 	{ data: 'materials/ACT01b_08.png', width: 'width_90'},
		back: 'ACT01b_01',
		next: 'ACT01b_09',
	},
	{
		id: 'ACT01b_09', // simoisamta 画像名変更 場合によって08->09はgifで対応し、09は削除
		texts: [
				{ type: 'topText', key: 'ACT01b_09'}
		],
		image: 	{ data: 'materials/ACT01b_08_4.png', width: 'width_90'},
		back: 'ACT01b_08',
		next: 'ACT01b_10',
	},
	{
		id: 'ACT01b_10', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01b_10'}
		],
		image: 	{ data: 'materials/ACT01b_10.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'ACT01b_11', descKey: 'ACT01b_10a'},
				{ id: 'option2', nextSection: 'ACT01b_12', descKey: 'ACT01b_10b'},
		],
	},
	{
		id: 'ACT01b_11', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01b_11'}
		],
		image: 	{ data: 'materials/ACT01b_11.png', width: 'width_60'},
		next: 'kim_1',
	},
	{
		id: 'ACT01b_12', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01b_12'}
		],
		image: 	{ data: 'materials/ACT01b_12.png', width: 'width_90'},
		back: 'ACT01b_11',
		next: 'ACT01b_13',
	},
	{
		id: 'ACT01b_13', // kinasar
		texts: [
				{ type: 'topText', key: 'ACT01b_13'}
		],
		image: 	{ data: 'materials/ACT01b_13.png', width: 'width_90'},
		options: [
				{ id: 'option1', nextSection: 'kim_2', descKey: 'ACT01b_13a'},
		],
	},
	{
		id: 'ACT01b_14', // tumikor okaketa
		texts: [
				{ type: 'topText', key: 'ACT01b_14'}
		],
		image: 	{ data: 'materials/ACT01b_14.png', width: 'width_90'},
		next: 'kim_2',
	},


	{
		id: 'kim_1', // kim - sinnay inoka
		texts: [],
		image: 	{ data: 'materials/kim_01.png', width: 'width_90'},
		next: 'ACT01_epilogue',
	},

	{
		id: 'kim_2', // kim - sinnay inoka
	image: 	{ data: 'materials/kim_02.png', width: 'width_90'},
		texts: [
				{ type: 'topText', key: 'kim_2'}
		],
		next: 'ACT01_epilogue',
	},

	{
		id: 'kim_3', // kim - sinnay inoka
		texts: [],
		image: 	{ data: 'materials/kim_03.png', width: 'width_90'},
		next: 'ACT01_epilogue',
	},

	{
		id: 'ACT01_epilogue',
	texts: [
		{ type: 'topText', key: 'ACT01_epilogue'},
		{ type: 'rightText', key: 'ACT01_epilogue_right'}
	],
	image: 	{ data: 'materials/ACT01_epilogue.png', width: 'width_90'},
	next: 'ACT02_home',
	},


	// ---ACT02---
		{
		id: 'ACT02_home',
		texts: [
				{ type: 'description', key: 'ACT02_home'}
		],
		options: [
				{ id: 'option1', nextSection: '0_home', descKey: 'ACT02_home_a'},
				{ id: 'option2', nextSection: '0_home', descKey: 'ACT02_home_b'},
				{ id: 'option3', nextSection: '0_home', descKey: 'ACT02_home_c'},
				{ id: 'save', nextSection: 'save', descKey: 'ACT02_save'}
		],
		image: 	{ data: 'materials/ACT02_menu.png', width: 'width_80'},
		verticalLayout: true,
	},

	{
		id: 'ACT02_end',
		texts: [
				{type: 'topText', key: 'ACT02_end'}
		],
		image: 	{ data: 'materials/ACT02_quiz_end.png', width: 'width_80'},
		options: [
				{ id: 'option1', nextSection: '', descKey: 'ACT02_end_next'},
		],
		backgroundColor: 'rgba(255,255,204,1.0)',
	},
	{
		id: 'ACT02_result_A',
		texts: [
				{type: 'topText', key: 'ACT02_result_A_top'}
		],
		image: 	{ data: 'materials/ACT02_result_A.png', width: 'width_90'},
		next: 'ACT03_01',
		backgroundColor: 'rgba(255,255,204,1.0)',
	},
	{
		id: 'ACT02_result_B',
		texts: [
				{type: 'topText', key: 'ACT02_result_B_top'}
		],
		image: 	{ data: 'materials/ACT02_result_B.png', width: 'width_90'},
		next: 'ACT03_01',
		backgroundColor: 'rgba(255,255,204,1.0)',
	},
	{
		id: 'ACT02_result_C',
		texts: [
				{type: 'topText', key: 'ACT02_result_C_top'}
		],
		image: 	{ data: 'materials/ACT02_result_C.png', width: 'width_90'},
		next: 'ACT03_01',
		backgroundColor: 'rgba(255,255,204,1.0)',
	},
	{
		id: 'ACT02_result_D',
		texts: [
				{type: 'topText', key: 'ACT02_result_D_top'}
		],
		image: 	{ data: 'materials/ACT02_result_D.png', width: 'width_90'},
		next: 'ACT03_01',
		backgroundColor: 'rgba(255,255,204,1.0)',
	},
	{
		id: 'save',
		texts: [
				{ type: 'topText', key: 'save'}
		],
		options: [
				{ id: 'option1', nextSection: 'ACT02_home', descKey: 'save_a'},
		],
		image: 	{ data: 'materials/save.png', width: 'width_80'},
	},

	// ---ACT03---
	{
		id: 'ACT03_01',
		texts: [
				{type: 'topText', key: 'ACT03_01'}
		],
		image: 	{ data: 'materials/ACT03_01.png', width: 'width_90'},
		next: 'ACT03_02',
		backgroundColor: 'rgba(204,255,255,1.0)',
	},
	{
		id: 'ACT03_02',
		texts: [
				{type: 'topText', key: 'ACT03_02'}
		],
		image: 	{ data: 'materials/ACT03_02.png', width: 'width_90'},
		next: 'ACT03_03',
		backgroundColor: 'rgba(204,255,255,1.0)',
	},
	{
		id: 'ACT03_03',
		texts: [
				{type: 'topText', key: 'ACT03_03'}
		],
		image: 	{ data: 'materials/ACT03_03.png', width: 'width_90'},
		next: 'ACT03_start',
		backgroundColor: 'rgba(204,255,255,1.0)',
	},
	{
		id: 'ACT03_start',
		texts: [
				{type: 'topText', key: 'ACT03_start'}
		],
		options: [
            { id: 'option1', nextSection: 'ACT03_07_konkani', descKey: 'ACT03_start_op1'},
            { id: 'option2', nextSection: 'ACT03_07_sirokani', descKey: 'ACT03_start_op2'},
            { id: 'option3', nextSection: 'normal_end', descKey: 'ACT03_start_op3'}
        ],
		backgroundColor: 'rgba(204,255,255,1.0)',
	},

	{
		id: 'ACT03_07_konkani',
		texts: [
				{type: 'topText', key: 'ACT03_07'},
                {type: 'bottomText', key: 'ACT03_07_konkani'}
		],
		image: 	{ data: 'materials/ACT03_07_konkani.png', width: 'width_90'},
        next: 'ACT03_08',
		backgroundColor: 'rgba(255,255,204,1.0)',
	},
	{
		id: 'ACT03_07_sirokani',
		texts: [
				{type: 'topText', key: 'ACT03_07'},
                {type: 'bottomText', key: 'ACT03_07_sirokani'}
		],
		image: 	{ data: 'materials/ACT03_07_sirokani.png', width: 'width_90'},
        next: 'ACT03_08',
		backgroundColor: 'rgba(255,255,204,1.0)',
	},

    {
		id: 'ACT03_08',
		texts: [],
		image: 	{ data: 'materials/ACT03_08.png', width: 'width_90'},
        next: 'ACT03_09',
	},

    // op2変更
	{
		id: 'ACT03_09',
		texts: [
				{type: 'topText', key: 'ACT03_09'}
		],
		image: 	{ data: 'materials/ACT03_09.png', width: 'width_90'},
		options: [
            { id: 'option1', nextSection: 'ACT03_10', descKey: 'ACT03_09_op1'},
            { id: 'option2', nextSection: 'ACT03_defeated_01', descKey: 'ACT03_09_op2'}
        ],
		backgroundColor: 'rgba(255,255,204,1.0)',
	},

    // op1変更
	{
		id: 'ACT03_10',
		texts: [
				{type: 'topText', key: 'ACT03_10'}
		],
		image: 	{ data: 'materials/ACT03_10.png', width: 'width_90'},
		options: [
            { id: 'option1', nextSection: 'ACT03_defeated_01', descKey: 'ACT03_10_op1'},
            { id: 'option2', nextSection: 'dead_end', descKey: 'ACT03_10_op2'}
        ],
		backgroundColor: 'rgba(255,255,204,1.0)',
	},


	{
		id: 'ACT03_defeated_01',
		texts: [],
		image: 	{ data: 'materials/ACT03_defeated_01.png', width: 'width_90'},
        next: 'ACT03_defeated_02',
	},

	{
		id: 'ACT03_defeated_02',
		texts: [
            {type: 'topText', key: 'ACT03_defeated_02_a'},
            {type: 'bottomText', key: 'ACT03_defeated_02_b'}
        ],
        next: 'ACT03_defeated_03',
		backgroundColor: 'rgba(255,255,204,1.0)',
	},

	{
		id: 'ACT03_defeated_03',
		texts: [
            {type: 'topText', key: 'ACT03_defeated_03'}
        ],
		image: 	{ data: 'materials/ACT03_defeated_03.png', width: 'width_90'},
		options: [
            { id: 'option1', nextSection: 'best_end', descKey: 'ACT03_defeated_03_op1'},
            { id: 'option2', nextSection: 'normal_end', descKey: 'ACT03_defeated_03_op2'}
        ],
	},










    // best end
    {
		id: 'best_end',
		texts: [
				{type: 'topText', key: 'best_end'}
		],
		image: 	{ data: 'materials/best_end.png', width: 'width_90'},
		backgroundColor: 'rgba(255,255,204,1.0)',
		next: '0_home',
	},


    // normal end
    {
		id: 'normal_end',
		texts: [
				{type: 'topText', key: 'normal_end_a'},
                {type: 'bottomText', key: 'normal_end_b'}
		],
		image: 	{ data: 'materials/normal_end.png', width: 'width_90'},
		backgroundColor: 'rgba(255,255,204,1.0)',
		next: '0_home',
	},

    // bitter end
    {
		id: 'bitter_end_01',
		texts: [
				{type: 'topText', key: 'bitter_end_01_a'},
                {type: 'bottomText', key: 'bitter_end_01_b'}
		],
		image: 	{ data: 'materials/bitter_end_01.png', width: 'width_90'},
		backgroundColor: 'rgba(255,255,204,1.0)',
		next: 'bitter_end_02',
	},
    {
		id: 'bitter_end_02',
		texts: [],
		image: 	{ data: 'materials/bitter_end_02.png', width: 'width_90'},
		backgroundColor: 'rgba(255,255,204,1.0)',
		next: 'bitter_end_03',
	},
    {
		id: 'bitter_end_03',
		texts: [
				{type: 'topText', key: 'bitter_end_03'}
		],
		image: 	{ data: 'materials/bitter_end_03.png', width: 'width_90'},
		backgroundColor: 'rgba(255,255,204,1.0)',
		next: '0_home',
	},

    // dead end
    {
		id: 'dead_end',
		texts: [
				{type: 'topText', key: 'dead_end_a'},
                {type: 'bottomText', key: 'dead_end_b'}
		],
		image: 	{ data: 'materials/ACT02_result_D.png', width: 'width_90'},
		backgroundColor: 'rgba(255,255,204,1.0)',
		next: '0_home',
	},

];

export default sections;