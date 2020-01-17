# README

## ################
## chatspace DB設計
## ################

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password||string|null: false|
|username||string|null: false|
### Association
-- has_many :groups_users
-- has_many :groups, through: :groups_users
-- has_many :chats


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
### Association
-- has_many :groups_users
-- has_many :users, through: :groups_users
-- has_many :chats


## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|message|string|null: false|
|url|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
-- belongs_to :user
-- belongs_to :group


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
-- belongs_to :group
-- belongs_to :user
