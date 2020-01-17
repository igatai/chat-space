# README

## ################
## chatspace DB設計
## ################

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false, index: true|
### Association
-- has_many :groups_users
-- has_many :groups, through: :groups_users
-- has_many :chats


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
-- has_many :groups_users
-- has_many :users, through: :groups_users
-- has_many :chats


## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|message|string||
|url|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
-- belongs_to :user
-- belongs_to :group


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
-- belongs_to :group
-- belongs_to :user
