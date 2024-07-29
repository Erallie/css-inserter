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
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection(this.betterClearHTMLTags(selection));
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
		const isHighlight = css.style.indexOf("background-color") !== -1;
		this.addCommand({
			id: `insert-css${index}`,
			name: `${css.name}`,
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection = editor.getSelection();
				editor.replaceSelection(`<${css.tag} class="${css.class}" style="${css.style}">${selection}</${css.tag}>`);
			}
		});
	}

	CSSInserterInContextMenu = (menu: Menu, editor: Editor) => {
		const enhancedApp = this.app as EnhancedApp;

		menu.addItem((item) =>
			item
				.setTitle("Remove CSS")
				.setIcon("eraser")
				.onClick(() => {
					enhancedApp.commands.executeCommandById(`css-inserter:remove-css`);
				})
		);

		this.settings.css.forEach((css, index) => {
			if (css.contextMenu) {
				menu.addItem((item) =>
					item
						.setTitle(css.name)
						.setIcon("highlighter")
						.onClick(() => {
							enhancedApp.commands.executeCommandById(`css-inserter:insert-css${index + 1}`);
						})
				);
			}
		});
	}

	updateBodyListClass() {
		document.body.classList.add("css-inserter");
	}
}

