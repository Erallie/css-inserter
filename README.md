# About CSS Inserter
This is a plugin for [Obsidian](https://obsidian.md/) that inserts user-defined css snippets into the selected text.

This plugin is a fork of [Style Text](https://github.com/juanjoarranz/style-text-obsidian-plugin) by [Juanjo Arranz](https://github.com/juanjoarranz).

The main difference between this plugin and [Style Text](https://github.com/juanjoarranz/style-text-obsidian-plugin) is that with CSS Inserter you can specify the html tag, the class, and the style for each CSS snippet.

This plugin requires basic knowledge of CSS. Links on how to format each setting can be found under [Set up CSS snippets](#set-up-css-snippets).

# Instructions
## Set up CSS snippets
After installing the plugin, first go to **Settings → CSS Inserter** and set up your CSS snippets the way you want.

Give your snippet a **name** and specify the HTML **tag**, the **class**, and the **style** you want the snippet to apply. Only a **name** and a **tag** are required. If you do not want to use the other options, leave them blank.

> [!info] Links for reference
> Here is a list of [HTML tags](https://www.w3schools.com/tags/default.asp) to use.
> 
> And here is a [guide](https://www.w3schools.com/html/html_styles.asp) on how to format the **style** part of the CSS snippet.
> Everything within the quotes following `style=` should be entered in the CSS snippet.

![[settings-panel.png#interface]]

You can re-order snippets by pressing the **up arrow** ( ![[lucide-arrow-up.svg#icon]] ) and **down arrow** ( ![[lucide-arrow-down.svg#icon]] ) buttons next to the snippet, or delete the entire snippet by pressing the **trash bin** ( ![[lucide-trash-2.svg#icon]] ) button.

The **toggle** option next to the snippet disables/enables showing the CSS snippet in the **Context menu**.

## Apply CSS Snippets
To apply the CSS snippet, first go into **Edit mode** and select the text you want to apply the snippet to.

After you do that, there are three ways you can apply a CSS snippet:

### 1. Context menu
After selecting your desired text, open the **Context menu**. Enabled snippets will appear there. You can select the CSS snippet you would like to apply to the selected text. After doing so, the snippet will be applied to the selected text.

![[context-menu.png#interface]]

### 2. Command palette
After selecting your desired text, open the **Command palette** and search for the CSS snippet you'd like to apply.

![[command-palette.png#interface]]

Select the CSS snippet you'd like to apply to your text. After doing so, the snippet will be applied to the selected text.

### 3. Hotkeys
Prior to selecting the text, you can go to **Settings → Hotkeys** beforehand and add a **Hotkey** for each CSS snippet.

![[hotkeys.png#interface]]

After setting these up, select your desired text, and perform the **Hotkey** you previously set up for the CSS snippet of your choice. The snippet will be applied to the selected text.

## Remove CSS snippets
You can remove the CSS snippet after selecting it. Selecting the CSS-ified text the first time will automatically select the entire text for you.

After you select the CSS-ified text, you can remove the CSS from the text by any of the three methods:
 1. Open the **Context menu** and select "Remove CSS" (see [Context menu](#1-context-menu)).
 2. Open the **Command palette** and perform the "CSS Inserter: Remove CSS" command (see [Command palette](#2-command-palette)).
 3. Set up a **Hotkey** prior in **Settings → CSS Inserter**. Afterward, select the text and perform the **Hotkey** (see [Hotkeys](#3-hotkeys)).
