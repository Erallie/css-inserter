import { App, Editor, MarkdownView, Menu, Modal, Plugin } from 'obsidian';

import { DEFAULT_SETTINGS, CSSInserterSettings, GeneralSettingsTab, CSS } from './settings'

export type EnhancedApp = App & {
    commands: { executeCommandById: Function };
};

export default class CSSInserter extends Plugin {
    settings: CSSInserterSettings;

    async onload(): Promise<void> {

        await this.loadSettings();
        this.addCommand({
            id: 'remove-css',
            name: 'Remove CSS',
            icon: 'lucide-eraser',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.removeCSS(editor);
            }
        });

        // CSS Commands
        this.settings.css.forEach((css, index) => {
            this.addCSSCommand(css, index + 1);
        });


        // CSS Context Menu
        this.registerEvent(
            this.app.workspace.on("editor-menu", this.CSSInserterInContextMenu)
        );

        this.updateBodyListClass();
        this.addSettingTab(new GeneralSettingsTab(this.app, this));
    }

    async loadSettings() {
        this.settings = { ...DEFAULT_SETTINGS, ...await this.loadData() };
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    clearHTMLTags(strToSanitize: string): string {
        return strToSanitize.replace(/(<([^>]+)>)/gi, '');
    }

    betterClearHTMLTags(strToSanitize: string): string {
        let myHTML = new DOMParser()
            .parseFromString(strToSanitize, 'text/html');
        return myHTML.body.textContent || '';
    }

    // index: 1-based
    addCSSCommand(css: CSS, index: number) {
        // const isHighlight = css.style.indexOf("background-color") !== -1;
        this.addCommand({
            id: `insert-css${index}`,
            name: `${css.name}`,
            icon: 'lucide-highlighter',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                const selection = editor.getSelection();
                let thisClass = "";
                if (`${css.class}` != "") {
                    thisClass = ` class="${css.class}"`;
                }
                let thisStyle = "";
                if (`${css.style}` != "") {
                    thisStyle = ` style="${css.style}"`;
                }
                editor.replaceSelection(`<${css.tag}${thisClass}${thisStyle}>${selection}</${css.tag}>`);
            }
        });
    }

    CSSInserterInContextMenu = (menu: Menu, editor: Editor) => {
        const enhancedApp = this.app as EnhancedApp;

        menu.addItem((item) =>
            item
                .setTitle("Remove CSS")
                .setIcon("lucide-eraser")
                .onClick(() => {
                    this.removeCSS(editor)
                })
        );

        menu.addItem((item) => {
            item
                .setTitle("Insert CSS")
                .setIcon('lucide-highlighter')
            const snippetSubMenu: Menu = (item as any).setSubmenu();
            this.settings.css.forEach((css, index) => {
                if (css.contextMenu) {
                    snippetSubMenu.addItem((item) =>
                        item
                            .setTitle(css.name)
                            .setIcon("lucide-highlighter")
                            .onClick(() => {
                                enhancedApp.commands.executeCommandById(`css-inserter:insert-css${index + 1}`);
                            })
                    );
                }
            });

        })
    }

    removeCSS(editor: Editor) {
        const selection = editor.getSelection();
        editor.replaceSelection(this.betterClearHTMLTags(selection));
    }

    updateBodyListClass() {
        document.body.classList.add("css-inserter");
    }
}

