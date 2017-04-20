# Deploying App

## 1) SSH to SilentMovie server
- ip: msriegel@ps575052.dreamhostps.com
- psw: p******1

## 2) CD into SilentMovie directory
$: CD SilentMovie/

## 3) Retrieve most recent branches
$: git fetch --all

## 4) Switch to new branch
$: git reset --hard origin/<branch-name>

## 5) Restart server
$: node_modules/pm2/bin/pm2 restart all
