MAIN_PACKAGE_PATH := ./cmd/api
BINARY_NAME := main

VITE_PROJECT_PATH := ../frontend
SERVER_DIR := ./internal/server
DIST_DIR := dist

.PHONY: embed-frontend
embed-frontend:
	@echo "Building Vite project..."
	@cd $(VITE_PROJECT_PATH) && npm run build
	@echo "Embedding dist directory..."
	@rm -rf $(SERVER_DIR)/$(DIST_DIR)
	@cp -r $(VITE_PROJECT_PATH)/$(DIST_DIR) $(SERVER_DIR)/$(DIST_DIR)

.PHONY: build
build: embed-frontend
	@echo "Building Go binary..."
	@go build -ldflags='-s -w' -o ./tmp/bin/${BINARY_NAME} ${MAIN_PACKAGE_PATH}

.PHONY: run
run:
	@go run ./cmd/api/main.go
