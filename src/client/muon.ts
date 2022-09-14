export namespace fileSEK {
    export async function promptFileAcquisition(): Promise<[boolean, string[]]> {
        let [res, out] = await (window as any).muon.dialogOpen() as [boolean, string[]];
        return [res, out]
    }
}