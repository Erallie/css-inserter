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

![Settings panel](./Attachments/settings-panel.png#interface)

You can re-order snippets by pressing the **up arrow** ( ![Up arrow](./Attachments/icons/lucide-arrow-up.svg#icon) ) and **down arrow** ( ![Down arrow](./Attachments/icons/lucide-arrow-down.svg#icon) ) buttons next to the snippet, or delete the entire snippet by pressing the **trash bin** ( ![Trash bin](./Attachments/icons/lucide-trash-2.svg#icon) ) button.

The **toggle** option next to the snippet disables/enables showing the CSS snippet in the **Context menu**.

## Apply and Remove CSS snippets
To apply or remove a CSS snippet, first go into **Edit mode** and select the text you want to apply the snippet to or remove the snippet from. The first time you select text that already has CSS snippets applied, the entire text will automatically be selected for you.

After you do that, there are three ways you can apply or remove a CSS snippet:
 1. On Desktop: Right-click the note to open the **Context menu**. Enabled snippets will appear there. Select the snippet you want to apply, or select "Remove CSS" to remove the applied CSS snippet.
    ![Context menu](./Attachments/context-menu.png#interface)
 2. Open the **Command palette** and search for and select the CSS style you'd like to apply, or perform the "CSS Inserter: Remove CSS" command to remove the CSS snippet (see [Command palette](https://help.obsidian.md/Plugins/Command+palette)).
 3. Set up a **Hotkey** prior for your desired CSS snippet (or for the "CSS Inserter: Remove CSS" command if you want to remove the CSS) in **Settings → CSS Inserter**. Afterward, select the text and perform the **Hotkey** (see [Hotkeys](https://help.obsidian.md/User+interface/Hotkeys)).
