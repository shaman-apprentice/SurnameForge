## TODO

## Ops know how

### Deploy

- Make sure folders specified in [.env.production](./backend/env/.env.production) exist on target server
- Configure nginx (see nginx)
- Configure *systemd* to run app, so it gets restarted etc. (see section below)

### Get "db dump"

`scp root@188.245.154.139:~/surnameforge/backend/lowdb/survey/surveys.json ./lowdbBackup`

### nginx

```sh
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
# http://<address>/ -> nginx welcome page
# edit /etc/nginx/sites-available/default to redirect everything to localhost:3000
sudo nginx -t
sudo systemctl restart nginx
```

### systemd

*/etc/systemd/system/surnameforge.service*
```
[Unit]
Description=Surname Forge App
After=network.target

[Service]
ExecStart=node /root/surnameforge/backend/dist/main.js
Restart=always
RestartSec=10
Environment=PATH=/usr/bin:/usr/local/bin
Environment="NODE_ENV=production"
Environment="SURNAMEFORGE_PATH_TO_FRONTEND=/root/surnameforge/frontend/dist/surnameforge/browser"
Environment="SURNAMEFORGE_PATH_TO_DB=/root/surnameforge/lowdb"
WorkingDirectory=/root/surnameforge/backend/dist

StandardOutput=append:/root/surnameforge/logs/output.log
StandardError=append:/root/surnameforge/logs/error.log

[Install]
WantedBy=multi-user.target
```

```sh
systemctl enable surnameforge.service
systemctl start surnameforge.service
systemctl stop surnameforge.service

journalctl -u surnameforge.service
systemctl daemon-reload
systemctl restart surnameforge.service
```
