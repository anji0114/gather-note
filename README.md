# Gather Note

作成したノートを**グループ内で共有できる**アプリです。

[https://gathernote.vercel.app/](https://gathernote.vercel.app/)

## 使用技術

1. Next.js
2. TypeScript
3. supabase
4. swr
5. zustand

## ER 図
![ER](https://github.com/anji0114/gather-note/assets/72867978/0654578e-c04e-4429-bf4c-32b038d09324)

## 機能説明

1. フォルダ機能
2. グループ機能
3. ボード機能

### フォルダ機能

ノートを管理するための機能です。

**フォルダの作成**
フォルダ管理ページより `新規作成` → `フォルダ名`, `フォルダ概要（任意）`を入力 → `フォルダ作成`をクリックする

**フォルダ編集・削除**
フォルダ詳細ページより、編集 → `編集する`、削除 → `ゴミ箱アイコン`をクリックする

---

### グループ機能

ユーザーが共通の興味や目的を持つ他のユーザーとつながり、協力して情報を共有することができる機能です。

**グループの作成**

グループ管理ページより、 `新規作成` → 作成ページにて必要項目入力し、 `グループ作成`をクリック

**グループの権限**

1. オーナー : グループの削除・編集、グループメンバーの権限付与・脱退　+ 管理者権限
2. 管理者　 : ボードの作成・削除・編集、ノートの追加・閲覧
3. メンバー : ボードへの、ノートの追加・閲覧

---

### ボード機能

**ボードの作成**

**ノートの共有**

**ディスカッション機能**

## 今後実装・改善予定機能

1. ディスカッション機能
2. グループ検索機能
3. グループ参加認証機能
4. 共同編集ノート機能（ボード内）
5. ボードへのノート追加の UI の改善
