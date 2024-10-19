## TODOs

- multi language support of survey
- update deploy (backend npm i --prod, keep _lowdb folder)

## deploy know how

- Folder _~/surnameforge_ must exist

- git ls-files -z --others --cached --exclude-standard | tar --null -T - -czf - | ssh root@<address> 'tar -xzf - -C ~/surnameforge'
- npm ci && npm run build each module
- create ~/surnameforge/backend/ _lowdb/survey_ and _lowdb/wordCloud_

- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- -> http://<address>/ -> nginx welcome page

- nano /etc/nginx/sites-available/default
- -> edit to redirect everything to localhost:3000
- sudo nginx -t
- sudo systemctl restart nginx

- node ~/surnameforge/backend/dist/main.js
