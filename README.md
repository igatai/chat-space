# README

## ################
## chatspace DB設計
## ################

## userテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password||string|null: false|
|username||string|null: false|
### Association
-- has_many :groups_users
-- has_many :groups, through: :groups_users
-- has_many :chats

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
### Association
-- has_many :groups_users
-- has_many :users, through: :groups_users
-- has_many :chats


## chatテーブル
|Column|Type|Options|
|------|----|-------|
|message|string|null: false|
|url|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
-- belongs_to :users
-- belongs_to :groups


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->
