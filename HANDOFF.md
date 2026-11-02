# Macへの移行・作業引き継ぎ

作成日: 2026-11-02
アプリ: 月の手帖 — タロットの学び
移行先: https://github.com/azimicat/tarot-notebook
現在の公開サイト: https://tarot-notebook-asahi.asahime.chatgpt.site
元ソースのコミット: 451ed38 (Explain card meanings behind incorrect choices)

## 最初に
ZIPを展開し、tarot-notebook フォルダをMacの好きな場所へ移動してください。
例: /Users/azimicat/Projects/azimicat/tarot-notebook
既存の同名フォルダがあれば上書きせず、別の場所で内容を比較してください。
デスクトップアプリでこのフォルダをローカルプロジェクトとして開き、新しいチャットを開始します。
このZIPにはソースと画像が含まれます。クラウドの認証情報、ブラウザセッション、Git履歴は含みません。

## 起動
Python 3が利用できる場合、展開したフォルダで:

```sh
python3 -m http.server 8000 --directory docs
```

ブラウザで http://localhost:8000 を開きます。終了はCtrl+Cです。
Node.jsが利用できる場合、テストは以下です。

```sh
node --check docs/app.js
node --check docs/data.js
node --test tests/backup.test.cjs
```
直近の確認では構文チェックと5件のテストが成功しています。

## 次のチャットへ渡す依頼

このフォルダのHANDOFF.mdとREADME.mdを読んでください。
/Users/azimicat/sandbox/ai-sklz-for-sre/lpr/SKILL.md を読み、その手順に従って
https://github.com/azimicat/tarot-notebook に、このアプリの現状を追加するPRを作成してください。
クラウド側では上記のローカルスキルを読めていません。内容を推測しないでください。
リポジトリの現状・認証・AGENTS.mdを確認し、既存ファイルや変更を上書きしないでください。
以前の確認ではリポジトリはpublicかつ空でしたが、必ず最新状態を再確認してください。
空の場合、PR比較元として最小限の初期コミットをmainに用意し、別ブランチでアプリを追加してください。
PR作成後はURLを報告してください。今回の依頼はPR作成なので、自動マージはしないでください。

## 未完了の作業
- GitHubへのソースのアップロード・PR作成は未完了。
- 初期コミット作成は自動承認レビューの利用上限エラーで実行されなかった。
- GitHub Pagesは未公開。docs/は配信用に準備済み。
- PRマージ後、Settings → Pages → Deploy from a branch → main /docs で公開できる構成。
- GitHubのログインや利用上限はMacでも別途確認が必要。ローカルへの移動だけでは解除されない。

## 実装済み機能
- ウェイト版78枚のカード図鑑、正位置・逆位置、英語名とカタカナ読み。
- 1セット10問の三択回答モード。
- 10項目の解説を読む学習モード、ランダム順／番号順の選択。
- スプレッド（置き方）の学習。
- ログインなし、localStorageに学習記録を保存、JSONのエクスポート／インポート。
- スマホ向け表示、問題中のヘッダー非表示、トップへ戻る、固定の次へボタン。
- 正解／不正解で教材の正解欄の背景色が変化。
- 回答後の正位置／逆位置比較は開いた状態、元の問題は閉じた状態。
- 不正解時は「選んだ答えは、どのカードの意味？」が折りたたみ表示。
  開くと意味が一致するカードの画像・名称・正位置／逆位置を表示。複数一致にも対応。

## 構成・注意事項
HTML/CSS/JavaScriptのみ。ビルドやnpm installは不要です。
画像78枚はdocs/assets/cards/に同梱。出典・加工情報はsources.jsonとREADME.md参照。
APIキー・DB・サーバー側アカウント機能はありません。
既存の公開サイトを変更・削除する必要はありません。

## 学習データの移行
利用者の学習記録はこのZIPには入りません。
旧サイトの「記録」でJSONをダウンロードし、移行先の「記録」でインポートしてください。
localhostとGitHub Pagesは保存領域が別です。インポートは移行先の記録を置き換えます。
