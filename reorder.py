import re
import json
import os

def convert_js_structure(input_file, output_file):
    
    try:
        # ファイルを読み込み
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"入力ファイル '{input_file}' を読み込みました")
        
        # 各言語セクションを抽出
        language_sections = {}
        
        # 言語セクションのパターンを定義
        # 'language': { ... }, の形式を検索
        language_pattern = r"'(\w+)':\s*\{\s*((?:[^{}]|\{[^{}]*\})*)\s*\},"
        
        matches = re.finditer(language_pattern, content, re.DOTALL)
        
        for match in matches:
            language = match.group(1)
            section_content = match.group(2)
            
            print(f"言語セクション '{language}' を処理中...")
            
            # 各キー・バリューペアを抽出
            # 'key': `value`, または 'key': 'value', の形式
            key_value_pattern = r"'([^']+)':\s*[`']([^`']*(?:\\.[^`']*)*)[`'],"
            
            key_values = {}
            kv_matches = re.finditer(key_value_pattern, section_content, re.DOTALL)
            
            for kv_match in kv_matches:
                key = kv_match.group(1)
                value = kv_match.group(2)
                key_values[key] = value
            
            language_sections[language] = key_values
            print(f"  - {len(key_values)} 個のキーを抽出しました")
        
        print(f"\n合計 {len(language_sections)} 個の言語セクションを抽出しました")
        
        # 新しい構造を作成
        commands = {}
        
        # すべてのキーを収集
        all_keys = set()
        for lang_data in language_sections.values():
            all_keys.update(lang_data.keys())
        
        print(f"合計 {len(all_keys)} 個のユニークなキーを発見しました")
        
        # 各キーについて言語別の値を収集
        for key in sorted(all_keys):
            commands[key] = {}
            for language, lang_data in language_sections.items():
                if key in lang_data:
                    commands[key][language] = lang_data[key]
                else:
                    print(f"警告: キー '{key}' が言語 '{language}' で見つかりません")
        
        # 新しいJavaScript構造を生成
        js_output = "const commands = {\n"
        
        for key, lang_values in commands.items():
            js_output += f"    '{key}': {{\n"
            for language, value in lang_values.items():
                # バッククォートで囲む（改行が含まれている可能性があるため）
                js_output += f"        '{language}': `{value}`,\n"
            js_output += "    },\n"
        
        js_output += "};\n\nexport default commands;"
        
        # ファイルに出力
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(js_output)
        
        print(f"\n変換完了！出力ファイル: '{output_file}'")
        print(f"変換されたキー数: {len(commands)}")
        
        # 統計情報を表示
        print("\n=== 統計情報 ===")
        for language in language_sections.keys():
            count = sum(1 for lang_vals in commands.values() if language in lang_vals)
            print(f"{language}: {count} 個のキー")
        
        return True
        
    except FileNotFoundError:
        print(f"エラー: ファイル '{input_file}' が見つかりません")
        return False
    except Exception as e:
        print(f"エラーが発生しました: {e}")
        return False

def preview_conversion(input_file, max_keys=5):
    """
    変換のプレビューを表示する
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("=== 変換プレビュー ===")
        
        # 言語セクションを抽出
        language_pattern = r"'(\w+)':\s*\{\s*((?:[^{}]|\{[^{}]*\})*)\s*\},"
        matches = re.finditer(language_pattern, content, re.DOTALL)
        
        language_sections = {}
        for match in matches:
            language = match.group(1)
            section_content = match.group(2)
            
            key_value_pattern = r"'([^']+)':\s*[`']([^`']*(?:\\.[^`']*)*)[`'],"
            key_values = {}
            kv_matches = re.finditer(key_value_pattern, section_content, re.DOTALL)
            
            for kv_match in kv_matches:
                key = kv_match.group(1)
                value = kv_match.group(2)
                key_values[key] = value
            
            language_sections[language] = key_values
        
        # 最初のいくつかのキーを表示
        all_keys = set()
        for lang_data in language_sections.values():
            all_keys.update(lang_data.keys())
        
        print(f"最初の {min(max_keys, len(all_keys))} 個のキーの変換例:")
        
        for i, key in enumerate(sorted(all_keys)):
            if i >= max_keys:
                break
                
            print(f"\n'{key}': {{")
            for language, lang_data in language_sections.items():
                if key in lang_data:
                    value = lang_data[key][:50] + "..." if len(lang_data[key]) > 50 else lang_data[key]
                    print(f"    '{language}': `{value}`,")
            print("},")
        
        if len(all_keys) > max_keys:
            print(f"\n... その他 {len(all_keys) - max_keys} 個のキー")
            
    except Exception as e:
        print(f"プレビューエラー: {e}")

def main():
    print("JavaScript構造変換ツール")
    print("=" * 50)
    
    # 入力ファイル名を取得
    input_file = input("入力JSファイル名を入力してください (例: commands.js): ").strip()
    
    if not input_file:
        input_file = "commands.js"
    
    if not os.path.exists(input_file):
        print(f"ファイル '{input_file}' が見つかりません。")
        return
    
    # プレビューを表示
    preview_conversion(input_file)
    
    # 確認
    proceed = input("\n変換を実行しますか？ (y/n): ").strip().lower()
    
    if proceed != 'y':
        print("変換をキャンセルしました。")
        return
    
    # 出力ファイル名を取得
    default_output = input_file.replace('.js', '_converted.js')
    output_file = input(f"出力ファイル名を入力してください (デフォルト: {default_output}): ").strip()
    
    if not output_file:
        output_file = default_output
    
    # 変換実行
    success = convert_js_structure(input_file, output_file)
    
    if success:
        print("\n変換が正常に完了しました！")
    else:
        print("\n変換に失敗しました。")

if __name__ == "__main__":
    main()