const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Recarrega um comando')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('Comando para testes.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`Não existem comando com nome \`${commandName}\`!`);
		}

		delete require.cache[require.resolve(`../commands/${command.data.name}.js`)];

		try {
	        interaction.client.commands.delete(command.data.name);
	        const newCommand = require(`../commands/${command.data.name}.js`);
	        interaction.client.commands.set(newCommand.data.name, newCommand);
	        await interaction.reply(`Comando \`${newCommand.data.name}\` foi recarregado!`);
		} catch (error) {
	        console.error(error);
	        await interaction.reply(`Houve um erro ao recarregar o comando \`${command.data.name}\`:\n\`${error.message}\``);
		}
	},
};