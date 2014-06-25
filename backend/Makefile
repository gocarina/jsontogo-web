all:
	sudo git pull
	sudo -E go get -u -v github.com/gocarina/jsontogo
	sudo -E go build src/jsontogo.go
	-sudo supervisorctl reread
	-sudo supervisorctl update
	-sudo supervisorctl restart jsontogo