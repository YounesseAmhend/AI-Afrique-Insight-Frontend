run:
	pnpm run dev

git:
	git add .
	git commit -m "$(m)"
	git push


docker:
	docker build . -t "frontend:latest"
	docker run -p 3000:80 frontend
