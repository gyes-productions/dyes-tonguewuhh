#!/bin/bash
branch="master"
script_dir="$(dirname "${BASH_SOURCE[0]}")"
hise_source=$script_dir/HISE
projucer_path=$hise_source/tools/projucer/Procucer.app/Contents/MacOS/Projucer

# Download HISE
cd "$script_dir"
rm -R -f HISE
git clone https://github.com/christophhart/HISE.git
cd "$hise_source"
git checkout $branch
# git submodule update --init --recursive

# Extract SDKs
unzip "$script_dir"/HISE/tools/SDK/sdk.zip -d "$script_dir"/HISE/tools/SDK

# Build HISE
"$projucer_path" --resave "$script_dir"/HISE/projects/standalone/HISE\ Standalone.jucer
cd "$script_dir"/HISE/projects/standalone/Builds/MacOSX
xcodebuild -project "HISE Standalone.xcodeproj" -configuration Release -jobs 2 | xcpretty