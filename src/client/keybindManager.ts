import { next } from './phi';

type keybinds = 'screenshot';

type keybindKeys = {
    [key in keybinds]: string;
};

const keybindCallbacks: {[key in keybinds] : () => void} = {
    screenshot: () => {
        
    }
}
