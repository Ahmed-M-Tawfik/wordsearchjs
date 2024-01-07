#!/bin/bash

# Definitions
delete_dist_folder() {
    if [ -d "dist" ]; then
        echo "Deleting existing 'dist' folder..."
        rm -r dist
    fi
}

compile_typescript() {
    echo "Compiling TypeScript to JavaScript..."
    tsc
}

# Calls
delete_dist_folder
compile_typescript
