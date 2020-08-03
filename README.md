## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, add_index unique: true|
|password|string|null: false|
|password_confirmation|string|null: false|

### Association
- has_many :massages
- has_many :groups_users
- has_many :users, through: :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|

### Association
- has_many :massages
- has_many :groups_users
- has_many :groups, through: :groups_users


## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
