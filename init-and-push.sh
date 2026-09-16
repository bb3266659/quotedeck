#!/bin/bash


# 1. รับค่า URL จากผู้ใช้

echo "--- ยินดีต้อนรับสู่การตั้งค่า GitHub ครั้งแรก ---"

echo "https://github.com/bb3266659/quotedeck"

read repo_url


# 2. เริ่มต้น Git

git init


# 3. เตรียมไฟล์

git add .


# 4. Commit ครั้งแรก

git commit -m "First commit: Initializing QuoteDeck"


# 5. เชื่อมต่อกับ GitHub

git branch -M main

git remote add origin $repo_url


# 6. ส่งไฟล์ขึ้น

git push -u origin main


echo "--- เสร็จเรียบร้อย! งานของคุณขึ้นไปอยู่บน GitHub แล้วครับ ---"