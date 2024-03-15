dev-fe:
    cd ./client && npm run dev

dev-be:
    cd ./server && npm run dev && pm2 logs server