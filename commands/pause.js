const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pausa a fila'),
    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(
                            'A fila está vazia! Por favor adicione alguma música!',
                        )
                        .setColor('e8d5ac'),
                ],
            });
        }
        try {
            if (queue.node.isPaused()) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('A fila já estava pausada!')
                            .setColor('e8d5ac'),
                    ],
                });
            } else {
                queue.node.setPaused(true);
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('A fila foi pausada!')
                            .setColor('e8d5ac'),
                    ],
                });
            }
        } catch (e) {
            return interaction.reply(`Algo deu errado: ${e}`);
        }
    },
};
