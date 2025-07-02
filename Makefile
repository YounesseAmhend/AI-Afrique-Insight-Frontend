dev:
	pnpm run dev

git:
	git add .
	git commit -m "$(m)"
	git push
	

build:
	docker build -t frontend .

run:
	docker run -p 3014:3014 frontend



