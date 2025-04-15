# Start the app with Docker Compose
run:
	docker-compose up -d

# Stop containers but preserve volumes and images
stop:
	docker-compose down

# Full reset: remove containers, images, volumes
reset:
	docker-compose down -v --rmi all --remove-orphans

# Rebuild everything from scratch
rebuild:
	docker-compose down -v --rmi all --remove-orphans
	docker-compose build --no-cache
	docker-compose up -d
