# Pixi'VN Tester

This repository is used to develop and debug the pixi-vn library.

## Instructions

### Clone the repository, download the submodules and install the dependencies

```bash
git clone https://github.com/DRincs-Productions/pixi-vn-tester
cd pixi-vn-tester
git submodule update --init --recursive
npm install
cd src/pixi-vn
git checkout main
npm install
cd ../..
cd src/labels-test
git checkout main
npm install
cd ../..
```

### Run the project

```bash
npm start
```

If you want debug you can press F5 in Visual Studio Code to start the debugger.
