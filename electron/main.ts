import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import * as fs from 'fs'
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

let win: BrowserWindow | null = null;

function createWindow() {
	win = new BrowserWindow({
		width: 1000,
		height: 700,
		minHeight: 700,
		minWidth: 1000,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js')
		}
	})

	if (isDev) {
		win.loadURL('http://localhost:3000/index.html');
	} else {
		// 'build/index.html'
		win.loadURL(`file://${__dirname}/../index.html`);
	}

	win.on('closed', () => win = null);

	// Hot Reloading
	if (isDev) {
		// 'node_modules/.bin/electronPath'
		require('electron-reload')(__dirname, {
			electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
			forceHardReset: true,
			hardResetMethod: 'exit'
		});
	}

	// DevTools
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	if (isDev) {
		console.log('is dev, opening dev tools')
		win.webContents.openDevTools();
	}
}

app.on('ready', () => {
	createWindow()
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	console.log('app activated')
	if (win === null) {
		console.log('creating window')
		createWindow();
	}
});

ipcMain.handle('muon_dialog_open', async (event, args) => {
	let res = await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections', 'dontAddToRecent']
    });

    if (res.canceled) return [false, []];

    return [true, res.filePaths];
})

ipcMain.handle('muon_file_content', async (event, ...args) => {
	console.log(args)
	try {
		let res = fs.readFileSync(args[0], {encoding: 'utf-8'})
		return [true, res]
	}
	catch (e) {
		return [false, e]
	}
})