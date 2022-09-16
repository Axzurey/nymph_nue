import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('muon', {
    dialogOpen: () => ipcRenderer.invoke('muon_dialog_open'),
    getFileContent: (fpath: string) => ipcRenderer.invoke('muon_file_content', fpath)
})