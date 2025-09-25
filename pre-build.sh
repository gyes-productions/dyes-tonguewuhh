#!/bin/bash
branch="develop"
script_dir="$(dirname "${BASH_SOURCE[0]}")"
hise_source=$script_dir/HISE
projucer_path=$hise_source/tools/projucer/Projucer.app/Contents/MacOS/Projucer

# Download HISE
cd "$script_dir"
pwd
rm -R -f HISE
git clone https://github.com/christophhart/HISE.git
cd "$hise_source"
git checkout $branch
cd ..
# git submodule update --init --recursive

# Extract SDKs
pwd
unzip ./HISE/tools/SDK/sdk.zip -d ./HISE/tools/SDK

# Build HISE
"$projucer_path" --resave "$script_dir"/HISE/projects/standalone/HISE\ Standalone.jucer
cd "$script_dir"/HISE/projects/standalone/Builds/MacOSX
pwd
xcodebuild -project "HISE Standalone.xcodeproj" -configuration Release -jobs 4 | xcpretty